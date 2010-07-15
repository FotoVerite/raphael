(function (Raphael) {

var inputArray = [];
var selectedInput = null;

Raphael.fn.textInput = function (x, y, width, height) {
     var input = new TextInput(x, y, width, height, this)
      inputArray.push(input);
      return input;
  };

    var TextInput = function (x, y, width, height, paper) {
        var xCord = x;
        var yCord = y;
        var textXCord = xCord + 10;
        var textYCord = yCord + height - 16;
        
        var self = this;
        var width = width || 200;
        var height = height || 30;
        
        self.textXCord = textXCord;
        self.textYCord = textYCord;
        
         self.outer = paper.rect(x, y, width, height).attr({
             stroke: "none",
             fill: "#FFF",
             stroke: "#000",
             opacity: 1
         });

         self.inner = paper.rect(x + 5, y + 4, width - 10, height - 8).attr({
             stroke: "none",
             fill: "#EEE",
             stroke: "#000",
             opacity: 1
         });
         
         self.textinput = paper.text(textXCord,textYCord, 'input text').
         attr({
           'text-anchor': "left"
         });
         
         self.rememberTxt = "";

          this.inner.node.onclick = function() {
            for (var x in inputArray)
              {
                inputArray[x].outer.attr({fill: "#FFF"})
              }   
              self.outer.attr({fill: "blue"})
              self.textinput.remove();
              selectedInput = self;
              selectedInput.textinput = paper.text(selectedInput.textXCord, selectedInput.textYCord, selectedInput.rememberTxt).
                  attr({
                    'text-anchor': "left"
                  });
       }

       
       window.onkeypress = function(event) {
         if(selectedInput != null) {
           if(event.charCode == 0) {
             selectedInput.rememberTxt = selectedInput.rememberTxt.slice(0, selectedInput.rememberTxt.length - 1)
           }
           else{
             selectedInput.rememberTxt += String.fromCharCode(event.charCode);
           }
           selectedInput.textinput.remove();
           selectedInput.textinput = paper.text(selectedInput.textXCord, selectedInput.textYCord, selectedInput.rememberTxt).
            attr({
              'text-anchor': "left"
            });
        }
       };
       
  
     };
     
})(window.Raphael);

