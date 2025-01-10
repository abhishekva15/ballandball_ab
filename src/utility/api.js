// export const getCaller = async (url) => {
//   console.log(url, "Responce");
//   console.log(process.env.REACT_APP_BASE_URL);
//   const token = localStorage.getItem("token");
//   const response = await fetch(
//     `${process.env.REACT_APP_BASE_URL}/bet-history?token=${token}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         token: `${localStorage.getItem("token")}`,
//       },
//     }
//   )
//     .then((response) => response.json())
//     .catch((error) => console.log(error));

//   return response;
// };

// getCaller()

export const getCaller = async (url, token) => {
  // console.log(url, "Response");
  // console.log(process.env.REACT_APP_BASE_URL);

  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error in getCaller:", error);
    return { error: "An error occurred while fetching data." };
  }
};


