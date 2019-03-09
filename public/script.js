var cards = [];
var isDataReceived = false;

function getMinecraftData(){
  
  hideGetDataButtons();

  if(isDataReceived === false)
  {
    fetch('items.json')
      .then(function(response) {
      return response.json();
    })
      .then(function(myJson) {
      isDataReceived = true;
      createCardsFromData(myJson, "items");
    });

    fetch('entities.json')
      .then(function(response) {
      return response.json();
    })
      .then(function(myJson) {
      isDataReceived = true;
      createCardsFromData(myJson,"entities");
    });
  }
}

function hideGetDataButtons()
{
  var smallButton = document.getElementById("smallSearchButton");
  smallButton.setAttribute("style", "display:none;");

  var mainButton = document.getElementById("bigSearchButton");
  mainButton.setAttribute("style", "display:none;");
}

function createCardsFromData(data, imgFolder)
{
  for(var i =0; i < data.length; i++)
  {
    
  createCard(data[i], imgFolder);
  }
}

function createCard(card_data, imgFolder)
{
  var cardDiv = createHtmlElement("div", "");

  var cardName = createHtmlElement("h2", card_data.name);
  var cardRarity = createHtmlElement("p", `Text Type: ${card_data.text_type}`);
  
  
  if(imgFolder === "entities")
  {
    var cardImg = createImgElement(`${imgFolder}/${card_data.type}.png`);
  }
  else
  {
    var cardImg = createImgElement(`${imgFolder}/${card_data.type}-${card_data.meta}.png`);
  }

  cardDiv.appendChild(cardName);
  cardDiv.appendChild(cardRarity);
  cardDiv.appendChild(cardImg);

  var cardClass = document.createAttribute("class");
  cardClass.value = "card";
  cardDiv.setAttributeNode(cardClass);
  
  pushDataToArray(card_data.name, cardDiv);
  addHtmlToRoot(cardDiv);
}

function pushDataToArray(cardName, cardNode)
{
  cards.push({
    name: cardName,
    node: cardNode
  })
}


function addHtmlToRoot(element)
{
  document.getElementById("root").appendChild(element);
}

function createHtmlElement(element, textValue)
{
  var elementNode = document.createElement(element);
  elementNode.textContent = textValue;
  return elementNode;
}

function createImgElement(src)
{
  var element = document.createElement("img");
  var attr = document.createAttribute("src");
  attr.value = src;                           // 
  element.setAttributeNode(attr);     
  return element;
}

function search(){
  var searchBar = document.getElementById("searchBar").value.toUpperCase();
  
  var results = [];
  
  if(isDataReceived)
  {
    if(searchBar !== "")
    {
      var myNode = document.getElementById("root");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }


      for(var i = 0; i < cards.length; i++)
      {
        var upperName = cards[i].name.toUpperCase();

        if(upperName.includes(searchBar))
        {
          results.push(cards[i]);
        }
      }

      for(var j = 0; j < results.length; j++)
      {
        addHtmlToRoot(results[j].node);
      }

    }
    else{
      for(var k = 0; k < cards.length; k++)
      {
        addHtmlToRoot(cards[k].node);
      }
    }
  }
}
