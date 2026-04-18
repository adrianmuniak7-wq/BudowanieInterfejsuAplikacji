import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";

import EventCard from "./components/EventCard";
import { EVENTS } from "./data/events";

// Wymóg: Pasek filtrów kategorii
const CATEGORIES = ["Wszystkie", "Nauka", "Sport", "Muzyka", "Film"];

export default function App() {
  const [eventsList, setEventsList] = useState(EVENTS);

  // Stany dla wyszukiwarki i filtrów
  const [searchQuery, setSearchQuery] = useState(""); // Wymóg: Wyszukiwanie tekstem
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie"); // Wymóg: Filtry kategorii
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); // Wymóg: Nasze własne rozszerzenie

  const toggleFavorite = (id) => {
    setEventsList(
      eventsList.map((event) =>
        event.id === id ? { ...event, favorite: !event.favorite } : event
      )
    );
  };

  // WYMÓG: Pochodny stan. Nie przetrzymujemy przefiltrowanej listy w osobnym stanie.
  // Filtrowanie działa RÓWNOCZEŚNIE dla kategorii, wyszukiwarki i ulubionych.
  const displayedEvents = eventsList.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Wszystkie" || event.category === selectedCategory;
    const matchesFavorites = showFavoritesOnly ? event.favorite : true;

    return matchesSearch && matchesCategory && matchesFavorites;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* WYMÓG: Nagłówek aplikacji z tytułem i krótkim opisem */}
        <Text style={styles.header}>Katalog Wydarzeń</Text>
        <Text style={styles.description}>
          Znajdź, przefiltruj i zapisz najciekawsze eventy w swojej okolicy!
        </Text>

        {/* WYMÓG: Pole wyszukiwania przez TextInput */}
        <TextInput
          style={styles.searchInput}
          placeholder="Wyszukaj wydarzenie po nazwie..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* WYMÓG: Pasek filtrów kategorii (przewijany w poziomie dla wygody) */}
        <View style={styles.categoriesWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat && styles.categoryButtonActive, // Wymóg: Wyraźnie inny wygląd aktywnego filtra
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === cat && styles.categoryTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Nasze własne rozszerzenie (wymóg zaliczenia) */}
        <Pressable
          style={[
            styles.filterButton,
            showFavoritesOnly && styles.filterButtonActive,
          ]}
          onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          <Text
            style={[
              styles.filterText,
              showFavoritesOnly && styles.filterTextActive,
            ]}
          >
            {showFavoritesOnly
              ? "⭐ Pokaż wszystkie"
              : "🤍 Pokaż tylko ulubione"}
          </Text>
        </Pressable>

        {/* WYMÓG: Liczba aktualnie widocznych wyników */}
        <Text style={styles.resultsCount}>
          Znaleziono wyników:{" "}
          <Text style={styles.resultsCountBold}>{displayedEvents.length}</Text>
        </Text>
      </View>

      <FlatList
        data={displayedEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            title={item.title}
            date={item.date}
            location={item.location}
            category={item.category}
            favorite={item.favorite}
            onToggle={() => toggleFavorite(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>
            Brak wydarzeń spełniających kryteria.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 4,
  },
  searchInput: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
  },
  categoriesWrapper: {
    flexDirection: "row",
    marginBottom: 16,
    width: "100%",
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#ddd",
    borderRadius: 16,
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: "#007BFF", // Aktywny filtr kategorii na niebiesko
  },
  categoryText: {
    color: "#333",
    fontSize: 14,
  },
  categoryTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    marginBottom: 12,
  },
  filterButtonActive: {
    backgroundColor: "#ffd700",
  },
  filterText: {
    fontWeight: "bold",
    color: "#555",
  },
  filterTextActive: {
    color: "#000",
  },
  resultsCount: {
    fontSize: 14,
    color: "#555",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  resultsCountBold: {
    fontWeight: "bold",
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
    fontStyle: "italic",
  },
});
