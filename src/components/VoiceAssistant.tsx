import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { getRecipesBySearch } from "../api/recipe.api";
import Cross from "../assets/Cross.svg";
import Microphone from "../assets/Microphone2.svg";
import {
  setIsAssistantActive,
  setSearchInput,
  setShowAssistant,
  setShowSearch,
} from "../redux/reducers/FilterSlice";
import {
  setLoadingSearchRecipes,
  setSearchRecipes,
} from "../redux/reducers/RecipeSlice";
import { RootState } from "../redux/store";

const VoiceAssistant = () => {
  const dispatch = useDispatch();
  const [assistantState, setAssistantState] = useState("Listening...");
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();
  const isAssistantActive = useSelector(
    (state: RootState) => state.filter.isAssistantActive
  );

  const mutation = useMutation({
    mutationFn: async (search: string) => {
      const response = await getRecipesBySearch(search);
      if (response) {
        dispatch(setSearchRecipes(response));
        dispatch(setShowSearch(true));
        dispatch(setLoadingSearchRecipes(false));
      } else {
        dispatch(setSearchRecipes([]));
        dispatch(setLoadingSearchRecipes(false));
      }
      dispatch(setShowAssistant(false));
      return response;
    },
  });

  useEffect(() => {
    if (isAssistantActive) {
      resetTranscript();
      setAssistantState("Listening...");
      toggleListening(4000);
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-IN",
      });
    } else {
      SpeechRecognition.stopListening();
      if (transcript.length > 0) {
        if (navigator.vibrate) {
          navigator.vibrate(200);
        }
        dispatch(setIsAssistantActive(false));
        dispatch(setSearchInput(transcript));
        dispatch(setLoadingSearchRecipes(true));
        setAssistantState(transcript);
        mutation.mutate(transcript);
      } else {
        setAssistantState("Didn't catch that. Please try again.");
      }
    }
  }, [isAssistantActive]);

  useEffect(() => {
    if (!isAssistantActive) {
      resetTranscript();
    }
  }, [isAssistantActive]);

  const toggleListening = (duration: number) => {
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
    setTimeout(() => {
      dispatch(setIsAssistantActive(false));
    }, duration);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="flex items-center h-full">
      <div className="flex flex-col items-center justify-between h-3/4 w-full">
        <div className="flex justify-start w-full px-4">
          <img
            src={Cross}
            alt="cross"
            className="w-10"
            onClick={() => {
              dispatch(setShowAssistant(false));
              dispatch(setIsAssistantActive(false));
              resetTranscript();
            }}
          />
        </div>
        <div>
          <span className="text-xl text-white">{assistantState}</span>
        </div>
        <div
          className={`${
            isAssistantActive ? "bg-red-600 ease-in-out" : "bg-gray-600 "
          } rounded-full w-24 h-24 flex justify-center`}
        >
          <img
            src={Microphone}
            alt="Microphone"
            className="w-10 cursor-pointer"
            onClick={() => {
              dispatch(setIsAssistantActive(!isAssistantActive));
              toggleListening(4000);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
