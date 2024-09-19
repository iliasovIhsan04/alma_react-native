import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import InstaStory from "react-native-insta-story";

type ImageURL = string;

interface Story {
  story_id: number;
  story_image: ImageURL;
  swipeText: string;
  duration: string;
  created_at: string;
  onPress: () => void;
  type: "image";
}

interface User {
  user_id: string;
  user_image: ImageURL;
  user_name: string;
  stories: Story[];
  link: string;
}

const StoryComponent = () => {
  const [seenStories, setSeenStories] = useState<Set<number>>(new Set());
  const [fetchedStories, setFetchedStories] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const updateSeenStories = useCallback(
    ({ story }: { story?: { story_id: number } }) => {
      if (story?.story_id) {
        setSeenStories((prevSet) => new Set(prevSet.add(story.story_id)));
      }
    },
    []
  );

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://alma-market.online/stories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const storiesData = await response.json();
        console.log("Fetched data:", storiesData);
        const transformedStories: User[] = storiesData.map((user: any) => ({
          user_id: user.id ?? "",
          user_image: user.img ?? "",
          user_name: user.title ?? "Unknown User",
          stories: Array.isArray(user.stories)
            ? user.stories.map((story: any, index: number) => ({
                story_id: story.id ?? index,
                story_image: story.url ?? "",
                swipeText: "",
                duration: story.duration ?? "",
                created_at: story.created_at ?? "",
                onPress: () => console.log(`Story ${story.created_at} swiped`),
                type: story.type ?? "image",
              }))
            : [],
          link: user.link ?? "",
        }));

        setFetchedStories(transformedStories);
      } catch (error) {
        setError("Ошибка загрузки данных. Попробуйте снова позже.");
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleStoryStart = (user?: User, story?: Story) => {
    if (!user || !story) {
      console.error("User or story data is missing");
      return;
    }
    console.log(
      `User ${user.user_name} started story with ID ${story.story_id}`
    );
    console.log(`Story image URL: ${story.story_image}`);
    console.log(`Story duration: ${story.duration}`);
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#DC0200" />;
    }
    if (error) {
      return <Text>{error}</Text>;
    }
    if (fetchedStories.length > 0) {
      const filteredStories = fetchedStories
        .map((user) => ({
          ...user,
          stories: user.stories.filter((story) => story.story_image),
        }))
        .filter((user) => user.stories.length > 0);

      if (filteredStories.length > 0) {
        return (
          <InstaStory
            key={filteredStories.map((user) => user.user_id).join("-")}
            data={filteredStories}
            duration={10}
            onStart={(data) => {
              console.log("On Start Data:", data);
              if (data?.user && data?.story) {
                handleStoryStart(data.user, data.story);
              } else {
                console.error("Story start data is incomplete.");
              }
            }}
            onStorySeen={updateSeenStories}
            renderCloseComponent={({ onPress }) => (
              <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>X</Text>
              </TouchableOpacity>
            )}
          />
        );
      } else {
        return <Text>No valid stories available</Text>;
      }
    }
  };

  return <View style={styles.storyContainer}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  storyContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: "rgba(107, 107, 107, 0.5)",

    borderRadius: 50,
    width: 40,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default StoryComponent;
