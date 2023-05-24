export var Steganography = (function() {
    function encodeMessage(imageData, message) {
        var messageBits = toBinary(message);
        var messageLength = messageBits.length;
        
        // Embed message length at the start
        for (var i = 0; i < 32; i++) {
            imageData.data[i] = (imageData.data[i] & 254) | ((messageLength >> i) & 1);
        }

        // Embed the message
        for (var i = 0; i < messageBits.length; i++) {
            imageData.data[i + 32] = (imageData.data[i + 32] & 254) | messageBits[i];
        }
    }

    function decodeMessage(imageData) {
        var messageLength = 0;
        for (var i = 0; i < 32; i++) {
            messageLength |= (imageData.data[i] & 1) << i;
        }
        
        var messageBits = [];
        for (var i = 32; i < messageLength + 32; i++) {
            messageBits.push(imageData.data[i] & 1);
        }
        
        return fromBinary(messageBits);
    }

    function toBinary(string) {
        var binary = [];
        for (var i = 0; i < string.length; i++) {
            var code = string.charCodeAt(i);
            for (var j = 0; j < 8; j++) {
                binary.push((code >> j) & 1);
            }
        }
        return binary;
    }

    function fromBinary(binary) {
        var string = '';
        for (var i = 0; i < binary.length; i += 8) {
            var code = 0;
            for (var j = 0; j < 8; j++) {
                code |= binary[i + j] << j;
            }
            string += String.fromCharCode(code);
        }
        return string;
    }

    return {
        hide: function(canvas, message) {
            var context = canvas.getContext('2d');
            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            encodeMessage(imageData, message);
            context.putImageData(imageData, 0, 0);
        },
        retrieve: function(canvas) {
            var context = canvas.getContext('2d');
            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            return decodeMessage(imageData);
        }
    };
})();
