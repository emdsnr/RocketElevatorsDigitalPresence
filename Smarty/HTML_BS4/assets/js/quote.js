$(document).ready(function() {
    
    // variables
    let buildingType;
    let selectedProductLine = 'standard';
    let cages = 0;
    let numberOfQuestions;

    // constants
    const productLineButtons = $('input[name=product-line]');

    const standardPrice = 7565;
    const standardFeeRate = 0.1;
    const premiumPrice = 12345;
    const premiumFeeRate = 0.13;
    const exceliumPrice = 15400;
    const exceliumFeeRate = 0.16;

    let price;
    let feeRate;


    // building type selector
    $("#confirm_building_btn").click(function() {
        $('#total_cages').text('');
        $('#total_fees').text('');
        $('#total_price').text('');


        buildingType = $("#building_type").val();

        if (buildingType === "residential") {

            numberOfQuestions = 3;

            // question 1
            $("#question1").hide().fadeIn(1000);
            $("#question1-label").text("number of apartments in the building");
            $("#input_question1").hide().fadeIn(1000).val("");
            
            // question 2
            $("#question2").hide().fadeIn(1000);
            $("#question2-label").text("number of floors contained in the building");
            $("#input_question2").hide().fadeIn(1000).val("");

            // question 3
            $("#question3").hide().fadeIn(1000);
            $("#question3-label").text("number of basements contained in the building");
            $("#input_question3").hide().fadeIn(1000).val("");

            // question 4
            $("question4").hide();
            $("#question4-label").hide();
            $("#input_question4").hide();

            // question 5
            $("question5").hide();
            $("#question5-label").hide();
            $("#input_question5").hide();

            // question 6
            $("question6").hide();
            $("#question6-label").hide();
            $("#input_question6").hide();
           
            
        } else if (buildingType === "corporate") {

            numberOfQuestions = 5;
            
            // question 1
            $("#question1").hide().fadeIn(1000);
            $("#question1-label").text("number of separate tenant companies in the building");
            $("#input_question1").hide().fadeIn(1000).val("");

            // question 2
            $("#question2").hide().fadeIn(1000);
            $("#question2-label").text("number of floors contained in the building");
            $("#input_question2").hide().fadeIn(1000).val("");

            // question 3
            $("#question3").hide().fadeIn(1000);
            $("#question3-label").hide().fadeIn(1000).text("number of basements contained in the building");
            $("#input_question3").hide().fadeIn(1000).val("");

            // question 4
            $("#question4").hide().fadeIn(1000);
            $("#question4-label").hide().fadeIn(1000).text("number of parking spaces available in the building");
            $("#input_question4").hide().fadeIn(1000).val("");

            // question 5
            $("#question5").hide().fadeIn(1000);
            $("#question5-label").hide().fadeIn(1000).text("maximum number of occupants per floor");
            $("#input_question5").hide().fadeIn(1000).val("");

            // question 6
            $("question6").hide();
            $("#question6-label").hide();
            $("#input_question6").hide();


        } else if (buildingType === "commercial") {

            numberOfQuestions = 5;
            
            // question 1
            $("#question1").hide().fadeIn(1000);
            $("#question1-label").text("number of distinct businesses in the building");
            $("#input_question1").hide().fadeIn(1000).val("");

            // question 2
            $("#question2").hide().fadeIn(1000);
            $("#question2-label").text("number of floors contained in the building");
            $("#input_question2").hide().fadeIn(1000).val("");

            // question 3
            $("#question3").hide().fadeIn(1000);
            $("#question3-label").text("number of basements contained in the building");
            $("#input_question3").hide().fadeIn(1000).val("");

            // question 4
            $("#question4").hide().fadeIn(1000);
            $("#question4-label").hide().fadeIn(1000).text("number of parking space available in the building");
            $("#input_question4").hide().fadeIn(1000).val("");

            // question 5
            $("#question5").hide().fadeIn(1000);
            $("#question5-label").hide().fadeIn(1000).text("number of elevator cages to be deployed");
            $("#input_question5").hide().fadeIn(1000).val("");

            // question 6
            $("question6").hide();
            $("#question6-label").hide();
            $("#input_question6").hide();
            
            
        } else if (buildingType === "hybrid") {

            numberOfQuestions = 6;
            
            // question 1
            $("#question1").hide().fadeIn(1000);
            $("#question1-label").hide().fadeIn(1000).text("number of distinct businesses in the building");
            $("#input_question1").hide().fadeIn(1000).val("");

            // question 2
            $("#question2").hide().fadeIn(1000);
            $("#question2-label").hide().fadeIn(1000).text("number of floors contained in the building");
            $("#input_question2").hide().fadeIn(1000).val("");

            // question 3
            $("#question3").hide().fadeIn(1000);
            $("#question3-label").hide().fadeIn(1000).text("number of basements contained in the building");
            $("#input_question3").hide().fadeIn(1000).val("");

            // question 4
            $("#question4").hide().fadeIn(1000);
            $("#question4-label").hide().fadeIn(1000).text("number of parking space available in the building");
            $("#input_question4").hide().fadeIn(1000).val("");

            // question 5
            $("#question5").hide().fadeIn(1000);
            $("#question5-label").hide().fadeIn(1000).text("maximum number of occupants per floor");
            $("#input_question5").hide().fadeIn(1000).val("");

            // question 6
            $("#question6").hide().fadeIn(1000);
            $("#question6-label").hide().fadeIn(1000).text("number of hours of activity of the building");
            $("#input_question6").hide().fadeIn(1000).val("");

            
        } else {

            alert("the selected option is invalid");

        };

    });



    function populateFields() {

        if (buildingType === 'residential'){

            // residential calculations
            const apartments = +$("#input_question1").val() || 0;
            const floors = +$("#input_question2").val() || 0;
            const basements = +$("#input_question3").val() || 0;

            const doorsPerFloor = floors === 0 ? 0 : Math.ceil(apartments / floors);
            const columns = Math.ceil(floors / 20);

            cages = columns * Math.ceil(doorsPerFloor / 6);


        } else if (buildingType === 'corporate' || 'hybrid') {

            // hybrid calculations
            const tenantCompanies = +$("#input_question1").val() || 0;
            const floors = +$("#input_question2").val() || 0;
            const basements = +$("#input_question3").val() || 0;
            const parkingSpaces = +$("#input_question4").val() || 0;
            const occupantsPerFloor = +$("#input_question5").val() || 0;
            const openHours = +$("#input_question6").val() || 0;

            const occupants = Math.ceil(occupantsPerFloor * ((floors + basements) / 1000));
            const columns = Math.ceil((floors + basements) / 20);
            const cagesPerColumn = Math.ceil(occupants / columns);
            const elevators = (columns * cagesPerColumn);
            
            cages = elevators;

        } else if (buildingType === 'commercial') {

            // commercial calculations
            cages = +$(`#input_question5`).val() || 0;


        }

        if (selectedProductLine === 'standard') {

            price = standardPrice;
            feeRate = standardFeeRate;


        } else if (selectedProductLine === 'premium') {

            price = premiumPrice;
            feeRate = premiumFeeRate;


        } else if (selectedProductLine === 'excelium') {

            price = exceliumPrice;
            feeRate = exceliumFeeRate;

        }
        
        let fees = cages * price * feeRate;
        let total = cages * price + fees;

        $('#total_cages').text(cages);
        $('#total_fees').text(`${fees.toFixed(2)}$ (${feeRate * 100}%)`);
        $('#total_price').text(total.toFixed(2) + '$');

    };

        $(`.form-control`).keyup(populateFields);

        productLineButtons.click(function () {

            selectedProductLine = $('input[name=product-line]:checked').attr('id');
            populateFields();

        });
});