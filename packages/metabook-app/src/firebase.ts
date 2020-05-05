import firestore from "@react-native-firebase/firestore";
import firebaseFunctions from "@react-native-firebase/functions";
import type firebase from "firebase/app";

/*let app: firebase.app.App | null = null;
export function getFirebaseApp(): firebase.app.App {
  if (!app) {
    app = firebase.initializeApp({
      apiKey: "AIzaSyAwlVFBlx4D3s3eSrwOvUyqOKr_DXFmj0c",
      authDomain: "metabook-system.firebaseapp.com",
      databaseURL: "https://metabook-system.firebaseio.com",
      projectId: "metabook-system",
      storageBucket: "metabook-system.appspot.com",
      messagingSenderId: "748053153064",
      appId: "1:748053153064:web:efc2dfbc9ac11d8512bc1d",
    });

    // console.log("cache directory", FileSystem.cacheDirectory);
    shimFirebasePersistence("");
  }
  return app;
}*/

export function getFirestore(): firebase.firestore.Firestore {
  return (firestore() as unknown) as firebase.firestore.Firestore;
}

export function getFirebaseFunctions(): firebase.functions.Functions {
  return (firebaseFunctions() as unknown) as firebase.functions.Functions;
}

export type PersistenceStatus = "pending" | "enabled" | "unavailable";
// const persistenceStatus: PersistenceStatus = "pending";
export async function enableFirebasePersistence(): Promise<PersistenceStatus> {
  await firestore().settings({
    persistence: false, // disable offline persistence
  } as any);
  return "enabled";
  /*if (persistenceStatus !== "pending") {
    return persistenceStatus;
  }

  console.log("[Performance] Requesting persistence", Date.now() / 1000.0);
  return getFirebaseApp()
    .firestore()
    .enablePersistence()
    .then(() => {
      persistenceStatus = "enabled";
      console.log("Enabled persistence");
      console.log("[Performance] Enabled persistence", Date.now() / 1000.0);
      return persistenceStatus;
    })
    .catch((error) => {
      console.error("Couldn't enable persistence", error);
      persistenceStatus = "unavailable";
      return persistenceStatus;
    });*/
}