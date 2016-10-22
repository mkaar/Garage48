package ee.mkaar.garage48;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by marko on 22/10/16.
 */
public class DistanceFinder {

    public static Map<String, String> getDurationAndDistance(String xStart, String yStart, String xEnd, String yEnd){
        String urlString = "http://openls.geog.uni-heidelberg.de/route?api_key=ee0b8233adff52ce9fd6afc2a2859a28&start=" +
                //"24.750452803014" +
                xStart +
                "," +
                //"59.4368535600592" +
                yStart +
                "&end=+" +
                //"24.7502427202473" +
                xEnd +
                "," +
                //"59.4400230280539" +
                yEnd +
                "&via=&lang=de&distunit=M&routepref=" +
                "Car" + //Car|Bicycle|Pedestrian
                "&weighting=" +
                "Fastest" + //Fastest|Shortest|Recommended
                "&avoidAreas=&useTMC=false&noMotorways=false&noTollways=false&noUnpavedroads=false&noSteps=false&noFerries=false&instructions=false";


        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> webResponse =
                restTemplate.getForEntity(urlString, String.class);
        String responseString = webResponse.getBody();
        String time = responseString.substring(responseString.indexOf("PT")+2,responseString.indexOf("</"));
        int timeInSeconds = calculateTime(time);
        String distanceInM = responseString.substring(responseString.indexOf("TotalDistance")+29, responseString.indexOf("ActualDistance")-17);

        Map<String,String> response = new HashMap<>();
        response.put("duration", "" + timeInSeconds);
        response.put("distance", distanceInM);
        return response;
    }

    private static int calculateTime(String time) {
        String hours = "0";
        String minutes = "0";
        String seconds = "0";

        if(time.contains("H")){
            hours = time.substring(0, time.indexOf("H"));
        }
        if(time.contains("M")){
            if(time.contains("H")){
                minutes = time.substring(time.indexOf("H") + 1, time.indexOf("M"));
            }
            minutes = time.substring(0, time.indexOf("M"));
        }
        if(time.contains("S")){
            if(time.contains("M")){
                seconds = time.substring(time.indexOf("M") + 1, time.indexOf("S"));
            }
            seconds = time.substring(0, time.indexOf("S"));
        }

        int total = Integer.valueOf(seconds) + (60 * Integer.valueOf(minutes)) + (3600 * Integer.valueOf(hours));

        return total;
    }


}
