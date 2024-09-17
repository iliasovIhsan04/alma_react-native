import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import InstaStory from "react-native-insta-story";

const data = [
  {
    user_id: 1,
    user_image:
      "https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg",
    user_name: "Ihsan",
    stories: [
      {
        story_id: 1,
        story_image:
          "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
      },
      {
        story_id: 2,
        story_image:
          "https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg",
      },
    ],
  },
  {
    user_id: 2,
    user_image:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    user_name: "Test User",
    stories: [
      {
        story_id: 1,
        story_image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU",
      },
      {
        story_id: 2,
        story_image:
          "https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg",
      },
    ],
  },
];

const StoryComponent = () => {
  const [seenStories, setSeenStories] = useState(new Set());

  const updateSeenStories = useCallback(({ story: { story_id } }) => {
    setSeenStories((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.add(story_id);
      return newSet;
    });
  }, []);

  const handleSeenStories = useCallback(async () => {
    console.log("Handling seen stories:", Array.from(seenStories));
    const storyIds = Array.from(seenStories);
    if (storyIds.length > 0) {
      try {
        const response = await fetch("yourApiEndpoint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ storyIds }),
        });
        console.log("API response:", await response.json());
      } catch (error) {
        console.error("Error posting seen stories:", error);
      }
      setSeenStories(new Set());
    }
  }, [seenStories]);

  return (
    <InstaStory
      data={data}
      duration={10}
      onStart={(item) => console.log("Story started:", item)}
      onClose={handleSeenStories}
      onStorySeen={updateSeenStories}
      renderCloseComponent={({ onPress }) => (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
      )}
      style={styles.storyContainer}
    />
  );
};

const styles = StyleSheet.create({
  storyContainer: {
    marginTop: 10,
  },
  button: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  textComponent: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
  },
  profileName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  swipeText: {
    color: "white",
    fontSize: 14,
  },
});

export default StoryComponent;
