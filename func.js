// const successfulDom = document.querySelector(".successful");
// const consentDom = document.querySelector("#consent");
// const consentLabelDom = document.querySelector(".checkbox");
// const consentFormRowDom = document.querySelector(".checkbox");
// const queryRadioDom = document.getElementsByName("querytype");
// const queryRadioContainerDom = document.querySelectorAll(
//   ".form__formRow-radioBox"
// );

// consentDom.addEventListener("change", function () {
//   consentLabelDom.classList.toggle("active");
// });

// for (let i = 0; i < queryRadioDom.length; i++) {
//   queryRadioContainerDom[i].addEventListener("click", () => {
//     queryRadioDom[i].checked = true;

//     for (let j = 0; j < queryRadioDom.length; j++) {
//       if (queryRadioDom[j].checked) {
//         queryRadioContainerDom[j].classList.add("active");
//       } else if (!queryRadioDom[j].checked) {
//         queryRadioContainerDom[j].classList.remove("active");
//       }
//     }
//   });
// }

// function handleForm(e) {
//   e.preventDefault();

//   let correctFlag = true;
//   const formData = new FormData(e.currentTarget);
//   const formObject = Object.fromEntries(formData);
//   //to collect radio and checkbox elements
//   let CheckAndRadio = {};
//   let currentName = "";
//   let nextPointer = "";
//   let valueFlag = "";
//   let CheckAndRadioIndexes = [];
//   for (let i = 0; i < e.srcElement.length; i++) {
//     if (
//       e.srcElement[i].type === "radio" ||
//       e.srcElement[i].type === "checkbox"
//     ) {
//       CheckAndRadioIndexes = [...CheckAndRadioIndexes, i];
//     }
//   }
//   //new array
//   for (let i = 0; i < CheckAndRadioIndexes.length; i++) {
//     let index = parseInt(CheckAndRadioIndexes[i]);
//     let indexPlus = parseInt(CheckAndRadioIndexes[i + 1]);
//     if (currentName == "") {
//       currentName = e.srcElement[index].name;
//       nextPointer = e.srcElement[indexPlus].name;
//     }

//     //start checking for flag
//     if (valueFlag == "") {
//       //data handling
//       CheckAndRadio = {
//         ...CheckAndRadio,
//         [e.srcElement[index].name]: e.srcElement[index].checked
//           ? e.srcElement[index].value
//           : "",
//       };

//       // if value exists
//       if (CheckAndRadio[e.srcElement[index].name] != "") {
//         valueFlag = "updated";
//       }
//     }
//     // after math
//     if (indexPlus) {
//       nextPointer = e.srcElement[indexPlus].name;
//     }
//     if (currentName != nextPointer) {
//       valueFlag = "";
//       currentName = nextPointer;
//     }
//     // console.log(
//     //   `index:${index},
//     //   i:${i},
//     //   valueFlag:${valueFlag},
//     //   currentName:${currentName},
//     //   nextPointer:${nextPointer},
//     //   index + 1:${indexPlus}`
//     // );
//     //end
//   }
//   // console.log(CheckAndRadio);
//   // console.log("end loop");

//   const formFinalObject = {
//     ...formObject,
//     ...CheckAndRadio,
//   };
//   //validation process
//   correctFlag = validateForm(formFinalObject, correctFlag);

//   if (!correctFlag) {
//     return;
//   }

//   //do something when right
//   successfulDom.classList.add("active");
//   setInterval(() => {
//     successfulDom.classList.remove("active");
//   }, 3500);
//   console.log(formFinalObject);
// }
// function validateForm(data, flag) {
//   for (const [key, value] of Object.entries(data)) {
//     let TargetDom = document.querySelector(`#${key}Alert`);
//     TargetDom.classList.remove("failed");

//     if (value == "") {
//       TargetDom.classList.add("failed");
//       flag = false;
//     }
//   }
//   if (!flag) {
//     return false;
//   } else {
//     return true;
//   }
// }
document.addEventListener("DOMContentLoaded", function () {
  const successfulDom = document.querySelector(".successful");
  const consentDom = document.querySelector("#consent");
  const consentLabelDom = document.querySelector(".checkbox");
  const queryRadioDom = document.getElementsByName("querytype");
  const queryRadioContainerDom = document.querySelectorAll(
    ".form__formRow-radioBox"
  );

  consentDom.addEventListener("change", function () {
    consentLabelDom.classList.toggle("active");
  });

  queryRadioContainerDom.forEach((container, index) => {
    container.addEventListener("click", () => {
      queryRadioDom[index].checked = true;
      queryRadioContainerDom.forEach((innerContainer, innerIndex) => {
        innerContainer.classList.toggle(
          "active",
          queryRadioDom[innerIndex].checked
        );
      });
    });
  });

  document.querySelector("form").addEventListener("submit", handleForm);

  function handleForm(e) {
    e.preventDefault();

    let correctFlag = true;
    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData);
    const checkAndRadio = {};
    console.log(e.currentTarget.elements);
    Array.from(e.currentTarget.elements).forEach((el) => {
      if (el.type === "radio" || el.type === "checkbox") {
        if (el.checked) {
          checkAndRadio[el.name] = el.value;
        } else if (!(el.name in checkAndRadio)) {
          checkAndRadio[el.name] = "";
        }
      }
    });

    const formFinalObject = { ...formObject, ...checkAndRadio };
    correctFlag = validateForm(formFinalObject);

    if (!correctFlag) return;

    successfulDom.classList.add("active");
    setTimeout(() => {
      successfulDom.classList.remove("active");
    }, 3500);

    console.log(formFinalObject);
  }

  function validateForm(data) {
    let isValid = true;
    for (const [key, value] of Object.entries(data)) {
      const targetDom = document.querySelector(`#${key}Alert`);
      targetDom.classList.remove("failed");

      if (!value) {
        targetDom.classList.add("failed");
        isValid = false;
      }
    }
    return isValid;
  }
});
