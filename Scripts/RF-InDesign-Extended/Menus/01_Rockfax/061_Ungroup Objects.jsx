﻿#target "InDesign";#targetengine 'main';$.level = 0;#include "../../Extendables/extendables.jsx";app.scriptPreferences.enableRedraw = false;function main () {  var finalSelection = [];  var originalSelection = app.selection;  for (var k = originalSelection.length - 1; k >= 0; k--) {      $.level = 0;    try{      var itemList = originalSelection[k].pageItems.everyItem().getElements();      originalSelection[k].ungroup();      app.select(itemList);            var indexList = {};      for (i = itemList.length-1;i >= 0;i--){        var previousLayer = itemList[i].extractLabel("PreGroupLayer");        indexList[itemList[i].index] = itemList[i];        if (previousLayer !== '') {itemList[i].itemLayer = previousLayer;}      }      var keyList = indexList.keys().sort(function(a,b){return Number(a) <= Number(b)}).reverse();      for (var i = 0; i < keyList.length; i++) {        indexList[keyList[i]].sendToBack();      }      keyList = keyList.reverse();      for (var i = 0; i < keyList.length; i++) {        indexList[keyList[i]].bringToFront();      }      finalSelection.push(itemList);    }catch(e){      finalSelection.push(originalSelection[k]);    }  }  app.select(finalSelection.flatten());}app.doScript ('main();', undefined, undefined, UndoModes.entireScript, "Ungroup Objects");