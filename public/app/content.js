
// var textArray = []
// var text = $(('[itemprop="name"]'), '.text--labelSecondary').each(function(){
//     var text = $(this).text();
//     if (!textArray.includes(text)) textArray.push(text)
// });



// chrome.runtime.sendMessage({greeting: textArray}, function(response) {
//     console.log(response.farewell);
//   });


function buildPropArr(els){
  let propArr = []
  let innerText
      for(i = 0; i < els.length; i++)  {
          innerText = els[i].getElementsByTagName('span')[0].innerText;
              if (!(propArr.includes(innerText))) propArr.push(innerText)
       }
  return propArr
  }
  


console.log('content script has been run')
chrome.extension.onMessage.addListener(function(request, sender, response) {
    if (request.type === 'onUpdateFrmEvent') {
      grpNameArray = buildPropArr(document.getElementsByClassName('text--labelSecondary'))
      chrome.storage.local.set({grpNameArray: grpNameArray}, function() {
        console.log('Value is set to ' + grpNameArray[0]);
      })
      response(grpNameArray);
;

      // chrome.runtime.sendMessage(
      //   "foo",
      //   function (response) {
      //     console.log(response)
      //   }
      // )



    };
    return true;
  });

chrome.extension.onMessage.addListener(function(request, sender, response) {
  if (request.type === 'popupInit') {
    response(buildPropArr(document.getElementsByClassName('text--labelSecondary')));
  };
  return true;
});



  // main page
// $(('[itemprop="name"]'), '.text--labelSecondary').each(function(){
//     var text = $(this).text();
//     console.log(text);
// });

// group page
// $(('.groupHomeHeader-groupName'), '.groupHomeHeader-groupNameLink').textContent



// event page
// $('.event-info-group--groupName').textContent