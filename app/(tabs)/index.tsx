import React, { useRef, useState } from "react";
import { ActivityIndicator, BackHandler, StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { WebView } from "react-native-webview";

export default function HomeScreen() {
  const webViewRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const backAction = () => {
      if (webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />

      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0066ff" />
        </View>
      )}

      <WebView
        ref={webViewRef}
        source={{ uri: "https://lab.suwebsolutions.com" }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={false}
        setBuiltInZoomControls={false}
        pullToRefreshEnabled={true}
        onLoad={() => setLoading(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
