import { View, Text, Pressable, StyleSheet } from "react-native";

export default function EventCard({
  title,
  date,
  location,
  category,
  favorite,
  onToggle,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>

      <Text style={styles.text}>{date}</Text>
      <Text style={styles.text}>{location}</Text>

      <Pressable
        style={[styles.button, favorite && styles.buttonActive]}
        onPress={onToggle}
      >
        <Text style={styles.buttonText}>
          {favorite ? "❤️ Ulubione" : "🤍 Dodaj"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    fontSize: 12,
    color: "gray",
  },
  text: {
    marginTop: 4,
  },
  button: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#ddd",
    borderRadius: 6,
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#ffcccc",
  },
  buttonText: {
    fontWeight: "bold",
  },
});