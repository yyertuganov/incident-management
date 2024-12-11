sap.ui.define([

], function() {
    'use strict';

    const statusMap = {
        "N": 1,
        "A": 2,
        "I": 2,
        "H": 3,
        "R": 3,
        "C": 4
    }

    return {
        formatStatus: function(currentStatus, index) {
            if (typeof currentStatus === "undefined") return "None"
            const statusIndex = statusMap[currentStatus]

            if (currentStatus === "H" && index == "3") {
                return "Warning"
            }
            if (currentStatus === "I" && index == "2") {
                return "Warning"
            }

            return index <= statusIndex ? "Success" : "None"
        }
    }
})