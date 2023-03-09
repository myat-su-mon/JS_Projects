let data = ["win:123", "htut:345", "vij:#23234", "Ja:7848"];
let userInput = "htut";
let searchData = userInput.toLocaleLowerCase();
for (let i = 0; i < data.length; i++) {
  let splitContent = data[i].split(":");
  if (splitContent[0].toLowerCase() === searchData) {
    console.log(splitContent[0] + " Number is " + splitContent[1]);
    break;
  }
  if ( i === data.length-1) {
    console.log(userInput + ' is not found!');
  }
}
