/* eslint-disable no-unused-vars */
// Surface
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import RippleButton from "./Shared/RippleButton";
import Robot from "./Shared/Robot";
import CameraControl from "./Shared/CameraControl";
import Light from "./Shared/Light";
import Background from "./Shared/Background";
// import { OrbitControls } from "@react-three/drei";
import { useSpeechSynthesis } from "./Shared/useSpeechSynthesis";
import Typewriter from "typewriter-effect";
import PhotoCard from "./Shared/PhotoCard";

const Page2 = () => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [animateRobot, setAnimateRobot] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [photoCardShow, setPhotoCardShow] = useState(false);
  const [robotPose, setRobotPose] = useState("pose 1 - presentation");
  const [showContinueText, setShowContinueText] = useState(false);
  const { speak, selectedVoice } = useSpeechSynthesis();
  const dialogues = [
    {
      text: "Now, let's explore the surface of Titan.",
      pose: "pose 1 - presentation",
      showPhotoCard: false,
      photoPath: "",
      photoCardPlace: "",
    },
    {
      text: "Titan's surface is a fascinating and complex landscape, with vast plains, dunes, mountains, and lakes made of liquid methane and ethane.",
      pose: "pose 2 - omfg",
      showPhotoCard: true,
      photoPath: "./assets/img/page3/surface-overview.jpeg", // Replace with the correct image path
      photoCardPlace: "left",
    },
    {
      text: "The surface is primarily covered with a thick layer of organic-rich haze, giving Titan its characteristic orange color.",
      pose: "pose 3 - hello",
      showPhotoCard: true,
      photoPath: "./assets/img/page3/organic-haze.jpeg", // Replace with the correct image path
      photoCardPlace: "right",
    },
    {
      text: "Beneath the haze, Titan's landscape is carved by rivers and lakes of liquid hydrocarbons, particularly in the polar regions, making it the only body in our solar system other than Earth with stable liquid on its surface.",
      pose: "pose 4 - warm welcome",
      showPhotoCard: true,
      photoPath: "./assets/img/page3/liquid-hydrocarbons.jpeg", // Replace with the correct image path
      photoCardPlace: "left",
    },
    {
      text: "The surface is also marked by icy volcanoes, known as cryovolcanoes, which spew water and ammonia instead of molten rock.",
      pose: "pose 5 - sit sad",
      showPhotoCard: false,
      photoPath: "",
      photoCardPlace: "",
    },
    {
      text: "Despite the frigid conditions, Titan's surface is constantly reshaped by erosion and the flow of liquid methane, creating a dynamic environment.",
      pose: "pose 6 - presentation flipped",
      showPhotoCard: true,
      photoPath: "./assets/img/page3/erosion.jpeg", // Replace with the correct image path
      photoCardPlace: "right",
    },
    {
      text: "In some regions, vast sand dunes stretch for hundreds of kilometers, composed of hydrocarbon grains that have settled from Titan's thick atmosphere.",
      pose: "pose 1 - presentation",
      showPhotoCard: true,
      photoPath: "./assets/img/page3/sand-dunes.jpeg", // Replace with the correct image path
      photoCardPlace: "left",
    },
    {
      text: "The surface pressure on Titan is slightly higher than Earth's, allowing the stable presence of liquid methane and ethane, which form lakes and rivers that could be similar to those on Earth, just much colder.",
      pose: "pose 2 - omfg",
      showPhotoCard: false,
      photoPath: "",
      photoCardPlace: "",
    },
  ];
  
  //  The speech and Dialougue handling commands
  useEffect(() => {
    if (selectedVoice) {
      speak(dialogues[0].text);
    }
  }, [selectedVoice]);

  const handleDialogueClick = () => {
    setTimeout(() => {
      setShowContinueText(false);
      setDialogueIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % dialogues.length;

        // Update robot pose
        setRobotPose(dialogues[newIndex].pose);

        // Speak the new dialogue
        speak(dialogues[newIndex].text);

        // Check if PhotoCard should be shown
        if (dialogues[newIndex].showPhotoCard) {
          setPhotoCardShow(true);
        } else {
          setPhotoCardShow(false);
        }

        return newIndex;
      });
    }, 500);
  };

  const handleExit = () => {
    setAnimateOut(true);
  };

  return (
    <div
      className="relative"
      style={{ width: "100vw", height: "100vh", position: "relative" }}
    >
      <Canvas>
        <Suspense fallback={null}>
          {/* // Background component for setting the background texture with a dark overlay */}
          <Background texturePath="/assets/img/titan-scenery-1.jpg" />
          <Robot
            animateIn={animateRobot}
            animateOut={animateOut}
            pose={robotPose}
          />
          <Light />
          <CameraControl />
        </Suspense>
      </Canvas>
      {/* Dialogue Box */}
      <div
        className="absolute lg:bottom-36 bottom-32 flex justify-center items-center w-full lg:h-40 rounded-lg text-white font-lato text-3xl cursor-pointer"
        onClick={handleDialogueClick}
      >
        <div className="glass-dialogue-box h-full flex items-center flex-col">
          <Typewriter
            key={dialogueIndex}
            onInit={(typewriter) => {
              typewriter
                .typeString(dialogues[dialogueIndex].text)
                .start()
                .callFunction(() => {
                  setShowContinueText(true);
                });
            }}
            options={{
              autoStart: true,
              delay: 50,
              cursor: "",
              deleteSpeed: Infinity,
            }}
          />
          {/* Blinking Continue Text */}
          {showContinueText && (
            <h2 className="mt-4 text-[16px] text-center font-lato text-white animate-pulse">
              Click to continue...
            </h2>
          )}
        </div>
      </div>
      <PhotoCard
            path={dialogues[dialogueIndex].photoPath}
            isShown={photoCardShow}
            placement={dialogues[dialogueIndex].photoCardPlace}
          />
      <div className="fixed w-full bottom-0 flex justify-between px-10">
        <RippleButton navigateTo="/page2">Previous</RippleButton>
        <RippleButton navigateTo="/page4" onClick={handleExit}>
          Next
        </RippleButton>
      </div>
    </div>
  );
};

export default Page2;
