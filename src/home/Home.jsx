import React, { useContext, useEffect, useState } from "react";
import Header from "../components/header/Header";
import { useLocation } from "react-router-dom";
import Game from "../components/game/Game";
import BetSection from "../components/BetSection/BetSection";
import { createSocket } from "../utility/newSocket";
import { playSpinSound, playWinSound } from "../utility/gameSettings";
import eventEmitter from "../utility/eventEmiiter";
import Loader from "../components/loader/Loader";
import ErrorModal from "../components/error/ErrorModal";
import { SoundContext } from "../context/SoundContext";

function Home() {
  const location = useLocation();
  const rawQuery = location.search.substring(1);
  const decodedQuery = decodeURIComponent(rawQuery);
  const [amount, setAmount] = useState("10.00");
  const [socket, setSocket] = useState(null);
  const [info, setInfo] = useState({});
  const [socketConnected, setSocketConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(false);
  const [isBetting, setIsBetting] = useState(false);
  const [resultData, setResultData] = useState({});
  const [historyData, setHistoryData] = useState([]);
  const [allBetData, setAllBetData] = useState([]);
  const [error, setError] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [winCombo, setWinCombo] = useState(false);
  const { sound } = useContext(SoundContext);

  let queryParams = {};
  try {
    queryParams = JSON.parse(
      '{"' + decodedQuery.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      function (key, value) {
        return key === "" ? value : decodeURIComponent(value);
      }
    );
  } catch (e) {
    queryParams = {};
  }

  useEffect(() => {
    if (queryParams.id) {
      const socketInstance = createSocket(queryParams.id, queryParams.game_id);
      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        setSocketConnected(true);
        eventEmitter.emit("socket", socketInstance);
      });
      socketInstance.on("disconnect", () => {
        setSocketConnected(false);
      });

      socketInstance.on("INFO", (data) => {
        setInfo(data);
      });

      socketInstance.on("ERROR", (data) => {
        setError(data);
        setErrorModal(true);
      });

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [queryParams.id]);

  const handleResultData = (data) => {
    try {
      setResultData(data);
      setTimeout(
        () => setHistoryData((oldata) => [...new Set([...oldata, data])]),
        600
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleBet = (data) => {
    try {
      setAllBetData((oldata) => {
        const newData = [...new Set([data, ...oldata])];
        return newData.slice(0, 10);
      });
    } catch (err) {
      console.error(err);
    }
  };

  console.log("Single", allBetData);

  useEffect(() => {
    let timer;
    if (errorModal) {
      timer = setTimeout(() => {
        setErrorModal(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [errorModal]);

  useEffect(() => {
    const handleReelComplete = (callback) => {
      const reelCompleted = callback();

      if (reelCompleted) {
        setIsBetting(false);
      }
    };

    eventEmitter.on("reelComplete", handleReelComplete);

    return () => {
      eventEmitter.off("reelComplete", handleReelComplete);
    };
  }, []);

  const handlePlacebet = () => {
    // Check if the bet amount is valid
    if (+amount > info.bl || +amount === 0) {
      return setShowBalance(true);
    }
    if (isBetting) return;
    setIsBetting(true);
    if (sound) {
      playSpinSound();
    }
    setWinCombo(false);

    socket.emit("SPIN", { betAmt: amount });

    socket.once("BET_RESULT", (data) => {
      console.log(data?.winCombo?.multiplier);
      setTimeout(() => {
        if (sound) {
          playWinSound();
        }
        setWinCombo(true);
        handleResultData(data);
      }, 1300);
    });
    socket.on("ALL_BETS", (data) => {
      setTimeout(() => {
        handleBet(data);
      }, 1300);
    });
  };

   useEffect(() => {
     const adjustHeight = () => {
       const userAgent = navigator.userAgent;
       let headerHeight = 0;

       // Check device type
       if (/iPhone/i.test(userAgent)) {
         headerHeight = 90; // iPhone header height
       } else if (/Android/i.test(userAgent)) {
         headerHeight = 45; // Android header height
       } else {
         headerHeight = 60; // Default header height for other devices
       }

       // Calculate usable height
       const usableHeight = window.innerHeight - headerHeight;

       // Set custom CSS variable
       document.documentElement.style.setProperty(
         "--viewport-height",
         `${usableHeight}px`
       );
     };

     // Initial adjustment
     adjustHeight();

     // Recalculate on resize
     window.addEventListener("resize", adjustHeight);

     // Cleanup
     return () => window.removeEventListener("resize", adjustHeight);
   }, []);

  console.log("ResltData", resultData);

  if (!socketConnected) {
    return <Loader message={"Connecting..."} />;
  }

  return (
    <>
      <div className="app">
        <div className="game-wrapper">
          <Header
            queryParams={queryParams}
            info={info}
            resultData={resultData}
          ></Header>
          <div className="wrapper">
            <Game
              info={info}
              isBetting={isBetting}
              resultData={resultData}
              handlePlacebet={handlePlacebet}
              amount={amount}
              setAmount={setAmount}
              socket={socket}
              winCombo={winCombo}
            ></Game>
          </div>
          <div className="game-statics">
            <BetSection
              allBetData={allBetData}
              resultData={resultData}
              setLoading={setLoading}
              queryParams={queryParams}
            ></BetSection>
          </div>
        </div>
      </div>
      {errorModal && <ErrorModal error={error} setErrorModal={setErrorModal} />}
    </>
  );
}

export default Home;
