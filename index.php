<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css"/>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>

    <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css">
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script src="http://code.jquery.com/jquery-1.8.3.js"></script>
    <script src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
    
    <link rel="stylesheet" href="./lib/leaflet/leaflet-measure.css">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
    <link href='./lib/leaflet/leaflet.fullscreen.css' rel='stylesheet' />
    <link href='https://www.jquery-az.com/jquery/css/jquery.multiselect.css' rel='stylesheet' />

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script> 
    <script src="https://www.jquery-az.com/jquery/js/multiselect-checkbox/jquery.multiselect.js"></script>
</head>

<body>
    <?php 
    $country = 'all';
    if (!empty($_GET['country'])) {
        $country = $_GET['country'];
    }
    
    $activities = 'all';
    if (!empty($_GET['activities'])) {
        $activities = $_GET['activities'];
    }

    $partners = 'all';
    if (!empty($_GET['partners'])) {
        $partners = $_GET['partners'];
    }
    ?>
    <div class="filter" style="width: 100%">

    

        <form method="get">
            <div class="country col-md-4 ">
                <label for="country">Country</label>
                <select class="chzn-select" id="country" name="country" multiple="" onchange="filterMap()">
                    <option value="all" <?php echo $country=='all' ? 'selected': '' ?>>All</option>
                    <option value="sudan" <?php echo $country=='sudan' ? 'selected': '' ?>>Sudan</option>
                    <option value="southsudan" <?php echo $country=='southsudan' ? 'selected': '' ?>>South Sudan</option>
                    <option value="uganda" <?php echo $country=='uganda' ? 'selected': '' ?>>Uganda</option>
                    <option value="kenya" <?php echo $country=='kenya' ? 'selected': '' ?>>Kenya</option>
                    <option value="somalia" <?php echo $country=='somalia' ? 'selected': '' ?>>Somalia</option>
                    <option value="ethiopia" <?php echo $country=='ethiopia' ? 'selected': '' ?>>Ethiopia</option>
                    <option value="djibouti" <?php echo $country=='djibouti' ? 'selected': '' ?>>Djibouti</option>
                </select>
             </div>


            <div class="activities col-md-4">
                <label for="activities">Activities</label>
                <select class="chzn-select" id ="activities" name="activities" multiple="" onchange="filterMap()">
                    <option value="all" <?php echo $activities=='all' ? 'selected': '' ?>>All</option>
                    <option value="Health" <?php echo $activities=='Health' ? 'selected': '' ?>>Health</option>
                    <option value="WASH" <?php echo $activities=='WASH' ? 'selected': '' ?>>WASH</option>
                    <option value="GBV" <?php echo $activities=='GBV' ? 'selected': '' ?>>GBV</option>
                    <option value="RCCE" <?php echo $activities=='RCCE' ? 'selected': '' ?>>RCCE</option>
                    <option value="PPE" <?php echo $activities=='PPE' ? 'selected': '' ?>>PPE</option>
                    <option value="Testing" <?php echo $activities=='Testing' ? 'selected': '' ?>>Testing</option>
                    <option value="Ambulances & Mobile Labs" <?php echo $activities=='Ambulances & Mobile Labs' ? 'selected': '' ?>>Ambulances & Mobile Labs</option>
                    <option value="Safe Trade Zones" <?php echo $activities=='Safe Trade Zones' ? 'selected': '' ?>>Safe Trade Zones</option>
                    <option value="Facilities" <?php echo $activities=='Facilities' ? 'selected': '' ?>>Facilities</option>
                </select>

            </div>
                

            <div class="partners" col-md-4>
                <label for="partners">Partners</label>
                <select class="chzn-select" name="partners" multiple="" id="partners" onchange="filterMap()">
                    <option value="all" <?php echo $partners=='all' ? 'selected': '' ?>>All</option>
                    <option value="UNOPS" <?php echo $partners=='UNOPS' ? 'selected': '' ?>>UNOPS</option>
                    <option value="UNICEF" <?php echo $partners=='UNICEF' ? 'selected': '' ?>>UNICEF</option>
                    <option value="IOM" <?php echo $partners=='IOM' ? 'selected': '' ?>>IOM</option>
                    <option value="TMEA" <?php echo $partners=='TMEA' ? 'selected': '' ?>>TMEA</option>
                </select>
            </div>
        </form>

        

    </div>


    <div id="map"></div>

    <script type="text/javascript" src="script.js"></script>
</body>

</html>
