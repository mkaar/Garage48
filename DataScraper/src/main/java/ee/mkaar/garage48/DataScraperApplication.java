package ee.mkaar.garage48;

import org.apache.commons.io.FileUtils;
import org.json.CDL;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.IOException;

public class DataScraperApplication {

	public static void main(String[] args) {
		if(args.length < 4){
			System.out.println("Usage: java -jar Scraper.jar xMin yMin xMax yMax");
			System.exit(0);
		}

		String urlString = "http://services.arcgis.com/7R9rAncKhw8E1lTo/arcgis/rest/services/Kindlustusjuhtumid_2016/FeatureServer/0/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry={geometry}&geometryType=esriGeometryEnvelope&inSR=3301&outFields=*&outSR=3301&resultType=tile";

		String geometry = "{\"xmin\":" +
				//"545585.726849626" +
				args[0] +
				",\"ymin\":" +
				//"6585329.13074252" +
				args[1] +
				",\"xmax\":" +
				//"545887.8239857788" +
				args[2] +
				",\"ymax\":" +
				//"6585631.227878673" +
				args[3] +
				",\"spatialReference\":{\"wkid\":3301}}";
		System.out.println(urlString);
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response =
				restTemplate.getForEntity(urlString, String.class, geometry);
		convert(response.getBody());

	}


	public static void convert(String jsonString){
		jsonString = jsonString.replaceAll("},\"geometry\":\\{", ",");
		System.out.println(jsonString);

		JSONObject output;
		try {
			output = new JSONObject(jsonString);
			JSONArray docs = output.getJSONArray("features");
			String json2 = docs.toString();
			json2 = json2.substring(1);
			json2 = json2.substring(0, 14) + "[" + json2.substring(14, json2.length());
			json2 = json2.replaceAll("\\{\"attributes\":", "");
			json2 = json2.replaceAll("}}", "}");
			json2 = "{\"attributes\":" + json2 + "}";
			JSONObject output2 = new JSONObject(json2);
			JSONArray docs2 = output2.getJSONArray("attributes");
			File file=new File("tmp.csv");
			String csv = CDL.toString(docs2);
			FileUtils.writeStringToFile(file, csv);
		} catch (JSONException e) {
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}



}
