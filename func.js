const successfulDom = document.querySelector(".successful");
const consentDom = document.querySelector("#consent");
const consentLabelDom = document.querySelector(".checkbox");
const consentFormRowDom = document.querySelector(".checkbox");
const queryRadioDom = document.getElementsByName("querytype");
const queryRadioContainerDom = document.querySelectorAll(
  ".form__formRow-radioBox"
);

consentDom.addEventListener("change", function () {
  consentLabelDom.classList.toggle("active");
});

for (let i = 0; i < queryRadioDom.length; i++) {
  queryRadioContainerDom[i].addEventListener("click", () => {
    queryRadioDom[i].checked = true;

    for (let j = 0; j < queryRadioDom.length; j++) {
      if (queryRadioDom[j].checked) {
        queryRadioContainerDom[j].classList.add("active");
      } else if (!queryRadioDom[j].checked) {
        queryRadioContainerDom[j].classList.remove("active");
      }
    }
  });
}

function handleForm(e) {
  e.preventDefault();

  let correctFlag = true;
  const formData = new FormData(e.currentTarget);
  const formObject = Object.fromEntries(formData);
  //to collect radio and checkbox elements
  let CheckAndRadio = {};
  for (let i = 0; i < e.srcElement.length; i++) {
    if (
      e.srcElement[i].type === "radio" ||
      e.srcElement[i].type === "checkbox"
    ) {
      CheckAndRadio = {
        ...CheckAndRadio,
        [e.srcElement[i].name]: e.srcElement[i].checked
          ? e.srcElement[i].value
          : "",
      };
    }
  }

  const formFinalObject = {
    ...formObject,
    ...CheckAndRadio,
  };
  //validation process
  correctFlag = validateForm(formFinalObject, correctFlag);

  if (!correctFlag) {
    return;
  }

  //do something when right
  successfulDom.classList.add("active");
  setInterval(() => {
    successfulDom.classList.remove("active");
  }, 3500);
  console.log(formFinalObject);
}
function validateForm(data, flag) {
  for (const [key, value] of Object.entries(data)) {
    let TargetDom = document.querySelector(`#${key}Alert`);
    TargetDom.classList.remove("failed");

    if (value == "") {
      TargetDom.classList.add("failed");
      flag = false;
    }
  }
  if (!flag) {
    return false;
  } else {
    return true;
  }
}
