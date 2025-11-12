import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, StatusBar, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMeme = async () => {
    setLoading(true);
    try {
      let data;
      do {
        const res = await fetch("https://meme-api.com/gimme");
        data = await res.json();
      } while (!data.url?.startsWith("https://"));
      setMeme(data);
    } catch (e) {
      console.error("Error fetching meme:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeme();
  }, []);

  return (
    <LinearGradient colors={["#1e1e2f", "#2d2d44", "#12121c"]} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>😂 JokesMemeApp 😂</Text>

        <View style={styles.card}>
          {loading ? (
            <ActivityIndicator size="large" color="#ffcc00" />
          ) : meme ? (
            <>
              <Text style={styles.caption}>{meme.title}</Text>
              <Image
                source={{ uri: meme.url }}
                style={styles.image}
                resizeMode="contain"
                onError={() => console.log("❌ Could not load:", meme.url)}
              />
              <Text style={styles.subText}>📸 from r/{meme.subreddit}</Text>
            </>
          ) : (
            <Text style={styles.errorText}>No meme found</Text>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={fetchMeme}>
          <LinearGradient colors={["#ffcc00", "#ff9900"]} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Get Another Meme 🔄</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footer}>Made with ❤️ by Gift</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textShadowColor: "#ff9900",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  card: {
    width: "90%",
    backgroundColor: "#2b2b3d",
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 8,
  },
  image: {
    width: "100%",
    height: 320,
    borderRadius: 12,
    marginVertical: 15,
  },
  caption: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  subText: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 16,
  },
  button: {
    width: "70%",
    marginTop: 25,
    borderRadius: 30,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#222",
    fontWeight: "bold",
  },
  footer: {
    color: "#777",
    marginTop: 40,
    fontSize: 14,
  },
});
