// === State ===

const bankNum = [];

const oddNum = [];

const evenNum = [];

function addNumber(number) {
  bankNum.push(number);
  render();
}

function sortNumber() {
  if (bankNum.length === 0) return;

  const num = bankNum.shift();
  if (num % 2 === 0) {
    evenNum.push(num);
  } else {
    oddNum.push(num);
  }
  render();
}

function sortNumbers() {
  while (bankNum.length > 0) {
    sortNumber();
  }
}

// === Components ===

function HeaderForm() {
  const $form = document.createElement("form");
  $form.innerHTML = /* html */ `
    <label>
      Add a number to the bank:
      <input name="number"/>
    </label>
    <button>Add number</button>
    <button id="sort1">Sort 1</button>
    <button id="sortAll">Sort All</button> 
  `;

  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData($form);
    const number = Number(data.get("number"));

    if (!Number.isInteger(number) || number < 0) {
      alert("That's not a valid input. Please enter a positive integer.");
      $form.reset();
      return;
    }

    addNumber(number);
    $form.reset();
  });

  $form.querySelector("#sort1").addEventListener("click", sortNumber);
  $form.querySelector("#sortAll").addEventListener("click", sortNumbers);

  return $form;
}

function Content() {
  const $content = document.createElement("section");
  $content.classList.add("content");

  $content.innerHTML = /* html */ `
    <h2>Bank</h2>
    <label>
      <input name="bank-number" size="75" value="${bankNum.join(
        "  "
      )}" readonly/>
    </label>
    <h2>Odds</h2>
    <label>
      <input name="odd-number" size="75" value="${oddNum.join("  ")}" readonly/>
    </label>    
    <h2>Evens</h2>
    <label>
      <input name="even-number" size="75" value="${evenNum.join(
        "  "
      )}" readonly/>
    </label>  
  `;

  return $content;
}

// === Render ===

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = /* html */ `
    <h1>Odds and Evens</h1>
    <div id="header-form"></div>
    <div id="content"></div>
  `;
  $app.querySelector("#header-form").appendChild(HeaderForm());
  $app.querySelector("#content").appendChild(Content());
}
render();
