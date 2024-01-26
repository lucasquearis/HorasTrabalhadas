const getElementToRender = document.getElementById("result");

function getInputValue() {
  const input = document.getElementById("hours-worked");
  return input.value;
}

function getHoursWorked(periods) {
  let totalMinutes = 0;

  periods.forEach((period, index, arr) => {
    if (index % 2 !== 0) return;
    const nextInterval = arr[index + 1];
    if (nextInterval) {
      const [hoursTwo, minutesTwo] = nextInterval.split(":");
      const [hours, minutes] = period.split(":");

      const firstIntervalMinutes = Number(minutes) + Number(hours) * 60;
      const secondIntervalMinutes = Number(minutesTwo) + Number(hoursTwo) * 60;

      totalMinutes += secondIntervalMinutes - firstIntervalMinutes;
    }
  });

  return `${Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0")}:${(totalMinutes % 60).toString().padStart(2, "0")}`;
}

function getPeriods(periodsString = "08:30 - 09:53 - 12:13 - 17:47") {
  const periods = periodsString.includes("-")
    ? periodsString.split(" - ")
    : periodsString.split(" ");

  return periods;
}

function renderCustomMessage(message, type) {
  const element = document.createElement("p");
  element.innerHTML = message;
  element.classList.add(type);
  getElementToRender.appendChild(element);
}

function renderInvalidFormatString() {
  renderCustomMessage(
    `Por favor, informe um período válido, por exemplo: 09:00 - 12:00`,
    "fail"
  );
}

function renderHoursResult(periods) {
  const formatedHours = getHoursWorked(periods);
  renderCustomMessage(
    `Você trabalhou um periodo de ${formatedHours}`,
    "success"
  );
}

function isValidPeriods(periods) {
  const regexTestHours = /^(0\d|1\d|2[0-3]):([0-5]\d)$/;
  const isValid = periods.every((period) => regexTestHours.test(period));
  return isValid;
}

function handleCleanResult() {
  getElementToRender.innerHTML = "";
}

function handleClick() {
  handleCleanResult();
  const periodsString = getInputValue();
  const periods = getPeriods(periodsString);

  if (periods.length % 2 === 0 && isValidPeriods(periods)) {
    renderHoursResult(periods);
  } else {
    renderInvalidFormatString();
  }
}
