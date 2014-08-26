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
        function getHexValue( intInput ) {
          var result = intInput.toString(16);
          if( result.length < 2 ) {
            result = '0' + result;
          }
          return result;
        }
        return getHexValue(red) + getHexValue(green) + getHexValue(blue);
      }
    };
  };

  // Utility for converting various color inputs to Color objects.
  var ColorUtil = {

    // Converts a hex-color to a Color object.
    convertHexToRgb: function( hexString ) {
      var rgbArr = [], hexPair;

      function getHexPartByIndex( index ) {
        switch( hexString.length ) {
          case 3:
            return hexString[index];
          default:
            index *= 2;
            return hexString[index] + hexString[index+1];
        }
      }

      // String the "#" off the hex-string.
      hexString = hexString.replace('#', '');
      
      // Convert pairs of hex-characters into decimal numbers.
      for(var i=0; i < hexString.length; i++) {
        rgbArr.push( parseInt(getHexPartByIndex( i ), 16) );
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
        parseFloat( splittedRgba[3], 10 )
      );
    }

  };

  // Converter which actually does the calculation from rgba to hex.
  var ColorConverter = {

    // Converts the given color to a Color object, using the given gbColor in the calculation.
    convertToHex: function( color, bgColor ) {
      var alpha = (1 - color.alpha);

      return new Color(
          Math.floor(alpha * bgColor.red + alpha * color.red),
          Math.floor(alpha * bgColor.green + alpha * color.green),
          Math.floor(alpha * bgColor.blue + alpha * color.blue)
      );
    }
  };

  // Expose calculation function to window object.
  var performcalculation = function() {
    var rgbaValue = document.getElementById( 'rgba' ).value;
    var backgroundValue = document.getElementById( 'background' ).value;
    
    if( !rgbaValue || !backgroundValue ) {
      // No values supplied.
      return;
    }
    var rgbaColor = ColorUtil.convertRgbaToColor( rgbaValue );
    var backgroundColor = ColorUtil.convertHexToRgb( backgroundValue );

    var result = rgbaColor;
    if( rgbaColor.alpha != 1 ) {
      // rgba color has transparency, so we need to convert it.
      result = ColorConverter.convertToHex( rgbaColor, backgroundColor );
    }

    var resultContainer = document.getElementById('resultcontainer');
    resultContainer.style.backgroundColor = '#' + result.toHex();
    document.getElementById('result').innerText = '#' + result.toHex();
  }

  // Eventlistener for the conversion form.
  document.getElementsByTagName('form')[0].addEventListener('submit', function(e) {
      e.preventDefault();
      performcalculation();
  });

})();
