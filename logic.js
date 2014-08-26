(function() {

  // Color object which contains the various primary colors and opacity.
  var Color = function( red, green, blue, alpha ) {
    var red, green, blue, alpha;
    return {
      red: red,
      green: green,
      blue: blue,
      alpha: alpha,
      toHex: function() {
        return red.toString(16) + green.toString(16) + blue.toString(16);
      }
    };
  };

  // Utility for converting various color inputs to Color objects.
  var ColorUtil = {

    // Converts a hex-color to a Color object.
    convertHexToRgb: function( hexString ) {
      // String the "#" off the hex-string.
      hexString = hexString.replace('#', '');
      var rgbArr = [], hexPair;
      
      // Convert pairs of hex-characters into decimal numbers.
      for(var i=0; i < hexString.length; i= i+2) {
        hexPair = hexString[i] + hexString[i+1];
        rgbArr.push( parseInt(hexPair, 16) );
      }

      return new Color(rgbArr[0], rgbArr[1], rgbArr[2]);
    },

    // Converts rgba string into a Color object.
    convertRgbaToColor: function( rgba ) {
      // Strip the rgba-definition off the string.
      rgba = rgba.replace('rgba(', '')
                 .replace(')', '')
                 .replace(' ', '');

      // Split the rgba string into an array.
      var splittedRgba = rgba.split(',');

      return new Color(
        parseInt( splittedRgba[0], 10 ),
        parseInt( splittedRgba[1], 10 ),
        parseInt( splittedRgba[2], 10 ),
        parseInt( splittedRgba[3], 10 )
      );
    }

  };

  // Converter which actually does the calculation from rgba to hex.
  var ColorConverter = {

    // Converts the given color to a Color object, using the given gbColor in the calculation.
    convertToHex: function( color, bgColor ) {
      var alpha = (1 - color.alpha);

      return new Color(
          (1 - alpha) * bgColor.red + alpha * color.red,
          (1 - alpha) * bgColor.green + alpha * color.green,
          (1 - alpha) * bgColor.blue + alpha * color.blue
      );
    }
  };

  // Expose calculation function to window object.
  var performcalculation = function() {
    var rgbaValue = document.getElementById( 'rgba' ).value;
    var backgroundValue = document.getElementById( 'background' ).value;
    var backgroundColor = ColorUtil.convertHexToRgb( backgroundValue );
    var rgbaColor = ColorUtil.convertRgbaToColor( rgbaValue );
    var result = ColorConverter.convertToHex( rgbaColor, backgroundColor );

    document.getElementById('result').innerText = '#' + rgbaColor.toHex();
  }

  // Eventlistener for the conversion form.
  document.getElementsByTagName('form')[0].addEventListener('submit', function(e) {
      e.preventDefault();
      performcalculation();
  });
})();
