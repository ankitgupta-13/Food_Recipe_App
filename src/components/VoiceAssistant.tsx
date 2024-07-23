import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { getRecipesBySearch } from "../api/recipe.api";
import MicroPhone from "../assets/Microphone.svg";
import { setSearchInput } from "../redux/reducers/FilterSlice";
import {
  setLoadingSearchRecipes,
  setSearchRecipes,
} from "../redux/reducers/RecipeSlice";

const VoiceAssistant = () => {
  const dispatch = useDispatch();
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();
  const [listeningState, setListeningState] = useState(false);
  const [wasListening, setWasListening] = useState(false);

  const mutation = useMutation({
    mutationFn: async (search: string) => {
      const response = await getRecipesBySearch(search);
      response && dispatch(setSearchRecipes(response));
      return response;
    },
  });

  useEffect(() => {
    if (listeningState) {
      resetTranscript();
      setWasListening(true);
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-IN",
      });
    } else {
      if (wasListening) {
        SpeechRecognition.stopListening();
        if (transcript.trim().length === 0) {
          alert("Please try again");
        } else {
          dispatch(setSearchInput(transcript));
          dispatch(setLoadingSearchRecipes(false));
          mutation.mutate(transcript);
        }
        setWasListening(false);
      }
    }
  }, [listeningState]);

  const toggleListening = (duration: number) => {
    setListeningState(true);
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
    setTimeout(() => {
      setListeningState(false);
    }, duration);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <img
        src={MicroPhone}
        onClick={() => {
          toggleListening(5000);
        }}
        alt="Microphone"
        className={`w-5 cursor-pointer transition-transform duration-200 ${
          listeningState
            ? "fill-blue-600 transform scale-125 filter brightness-125"
            : ""
        }`}
      />
    </div>
  );
};

export default VoiceAssistant;
