import {
  applyActionLogToPromptState,
  PromptActionLog,
  PromptState,
} from "metabook-core";
import {
  ReviewAreaMarkingRecord,
  ReviewAreaProps,
  ReviewItem,
  styles,
  useLayout,
  useTransitioningColorValue,
} from "metabook-ui";
import { getColorPaletteForReviewItem } from "metabook-ui/dist/reviewItem";
import { colors, layout } from "metabook-ui/dist/styles";
import React, { useCallback, useMemo, useState } from "react";
import { Animated, Easing, Insets, View } from "react-native";

export function ReviewSessionWrapper({
  baseItems,
  onMark,
  overrideColorPalette,
  children,
  insets,
}: {
  baseItems: ReviewItem[];
  onMark: (
    markingRecord: ReviewAreaMarkingRecord,
  ) => Promise<PromptActionLog[]>;
  overrideColorPalette?: styles.colors.ColorPalette;
  children: (args: {
    onMark: (markingRecord: ReviewAreaMarkingRecord) => void;
    items: ReviewItem[];
    currentItemIndex: number;
    containerWidth: number;
    containerHeight: number;
  }) => React.ReactNode;
  insets?: Insets;
}) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [localStates, setLocalStates] = useState<Map<ReviewItem, PromptState>>(
    new Map(),
  );

  const localOnMark = useCallback<ReviewAreaProps["onMark"]>(
    async (marking) => {
      const logs = await onMark(marking);
      setLocalStates((localStates) => {
        let basePromptState: PromptState | null =
          marking.reviewItem.promptState;
        for (const log of logs) {
          const newPromptState = applyActionLogToPromptState({
            promptActionLog: log,
            basePromptState,
            schedule: "default",
          });
          if (newPromptState instanceof Error) {
            throw newPromptState;
          }
          basePromptState = newPromptState;
        }
        if (!basePromptState) {
          throw new Error(
            "Invariant violation: applying marking logs should produce prompt state",
          );
        }

        return new Map([...localStates, [marking.reviewItem, basePromptState]]);
      });
      setCurrentItemIndex((index) => index + 1);
    },
    [onMark],
  );

  const items = useMemo(
    () =>
      baseItems.map((item) => {
        const localState = localStates.get(item);
        return localState ? { ...item, promptState: localState } : item;
      }),
    [localStates, baseItems],
  );

  const currentColorPalette =
    overrideColorPalette ??
    (items[currentItemIndex]
      ? getColorPaletteForReviewItem(items[currentItemIndex])
      : getColorPaletteForReviewItem(items[items.length - 1])) ??
    colors.palettes.red;
  const backgroundColor = useTransitioningColorValue({
    value: currentColorPalette.backgroundColor,
    timing: {
      type: "timing",
      useNativeDriver: false,
      duration: 150,
      easing: Easing.linear,
    },
  });

  const {
    width: containerWidth,
    height: containerHeight,
    onLayout,
  } = useLayout();

  console.log("[Performance] Render", Date.now() / 1000.0);

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor,
        paddingTop: insets?.top ?? 0,
        paddingLeft: insets?.left ?? 0,
        paddingRight: insets?.right ?? 0,
        paddingBottom: insets?.bottom ?? 0,
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          maxWidth: layout.maximumContentWidth,
          maxHeight: layout.maximumContentHeight,
          margin: "auto",
        }}
        onLayout={onLayout}
      >
        {containerWidth > 0
          ? children({
              onMark: localOnMark,
              currentItemIndex,
              items,
              containerWidth,
              containerHeight,
            })
          : null}
      </View>
    </Animated.View>
  );
}
