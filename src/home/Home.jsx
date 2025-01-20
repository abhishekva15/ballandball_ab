import React, { useContext, useEffect, useState } from "react";
import Header from "../components/header/Header";
import { useLocation } from "react-router-dom";
import Game from "../components/game/Game";
import BetSection from "../components/BetSection/BetSection";
import { createSocket } from "../utility/newSocket";
import {
  pauseArrowSound,
  playSpinSound,
  playWinSound,
  playPopSound,
  pausePopSound,
} from "../utility/gameSettings";
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
  // const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(false);
  const [ballResult, setBallResult] = useState({});
  const [isBetting, setIsBetting] = useState(false);
  const [resultData, setResultData] = useState({});
  // const [historyData, setHistoryData] = useState([]);
  const [allBetData, setAllBetData] = useState([]);
  const [error, setError] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [winComboo, setWinComboo] = useState(false);
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

      socketInstance.on("BET_RESULT", (data) => {
        try {
          setBallResult(data);
        } catch (error) {
          console.error("Error handling BET_RESULT:", error);
        }
      });

      socketInstance.on("ALL_BETS", (data) => {
        try {
          setTimeout(() => {
            handleBet(data);
          }, 2300);
        } catch (error) {
          console.error("Error handling ALL_BETS event:", error);
        }
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
      // setTimeout(
      //   () => setHistoryData((oldata) => [...new Set([...oldata, data])]),
      //   600
      // );
    } catch (err) {
      console.error(err);
    }
  };

  // console.log("Single", allBetData);

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
      playSpinSound(); // Play sound when the bet is placed
    }

    setWinComboo(false);

    socket.emit("SPIN", { betAmt: parseFloat(amount) });

    socket.once("BET_RESULT", (data) => {
      console.log(data);
      setTimeout(() => {
        setWinComboo(true);
        handleResultData(data);

        // setIsBetting(false); // You may want to uncomment this to stop the betting state
      }, 2300);
    });
  };

  useEffect(() => {
    const adjustHeight = () => {
      const userAgent = navigator.userAgent;
      const isLandscape = window.innerWidth > window.innerHeight;
      let headerHeight = 0;

      if (isLandscape) {
        document.documentElement.style.setProperty(
          "--viewport-height",
          `${window.innerHeight}px`
        );
        return;
      }

      if (/iPhone/i.test(userAgent)) {
        headerHeight = 90; // iPhone header height
      } else if (/Android/i.test(userAgent)) {
        headerHeight = 45; // Android header height
      } else {
        headerHeight = 60; // Default header height for other devices
      }

      const usableHeight = window.innerHeight - headerHeight;

      document.documentElement.style.setProperty(
        "--viewport-height",
        `${usableHeight}px`
      );
    };

    adjustHeight();

    window.addEventListener("resize", adjustHeight);

    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  // console.log("ResltData", resultData);

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
              winComboo={winComboo}
            ></Game>
          </div>
          <div className="game-statics">
            <BetSection
              allBetData={allBetData}
              resultData={resultData}
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
