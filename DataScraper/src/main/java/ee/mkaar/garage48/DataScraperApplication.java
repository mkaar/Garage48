package ee.mkaar.garage48;

import org.json.CDL;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;

public class DataScraperApplication {

	public static void main(String[] args) {

		List<String> lines = getAddressLines();

		int size = lines.size()/5;

		List<String> subList1 = lines.subList(0, 0 + size);
		List<String> subList2 = lines.subList(size, 2 * size);
		List<String> subList3 = lines.subList(2*size, 3 * size);
		List<String> subList4 = lines.subList(3*size, 4 * size);
		List<String> subList5 = lines.subList(4*size, lines.size());

		Thread t1 = new Thread(new Runnable() {
			public void run() {
				 init(subList1);
			}
		});
		t1.start();

		Thread t2 = new Thread(new Runnable() {
			public void run() {
				 init(subList2);
			}
		});
		t2.start();


		Thread t3 = new Thread(new Runnable() {
			public void run() {
				init(subList3);
			}
		});
		t3.start();

		Thread t4 = new Thread(new Runnable() {
			public void run() {
				init(subList4);
			}
		});
		t4.start();

		Thread t5 = new Thread(new Runnable() {
			public void run() {
				init(subList5);
			}
		});
		t5.start();

	}

	private static void init(List<String> lines) {
		for (String rida : lines){
			String[] data = rida.split(",");
			String x = data[6];
			String y = data[7];
			BigDecimal xbd = new BigDecimal(x);
			BigDecimal ybd = new BigDecimal(y);
			BigDecimal xMin = new BigDecimal(String.valueOf(xbd.subtract(new BigDecimal("100"))));
			BigDecimal yMin = new BigDecimal(String.valueOf(ybd.subtract(new BigDecimal("100"))));
			BigDecimal xMax = new BigDecimal(String.valueOf(xbd.add(new BigDecimal("100"))));
			BigDecimal yMax = new BigDecimal(String.valueOf(ybd.add(new BigDecimal("100"))));
			System.out.println(data[0]);
			parseSite(xMin.toString(), yMin.toString(), xMax.toString(), yMax.toString());
		}
	}

	private static List<String> getAddressLines() {
		String csvFile = "/Users/marko/Documents/Garage48/Keskklinn_addresses.csv";
		String line;

		List<String> lines = new ArrayList<>();

		try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {

			while ((line = br.readLine()) != null) {
				lines.add(line);
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		lines.remove(0);

		String filename = "/Users/marko/Documents/Garage48/DataScraper/tmp.csv";
		Path filepath = Paths.get(filename);
		File file = new File(filename);
		if ( file.exists() ) {
            file.delete();
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		final Path tmp = filepath.getParent();
		if (tmp != null) {
			try {
				Files.createDirectories(tmp);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}


			return lines;
	}

	public static void parseSite(String xMin, String yMin, String xMax, String yMax){
		String urlString = "http://services.arcgis.com/7R9rAncKhw8E1lTo/arcgis/rest/services/Kindlustusjuhtumid_2016/FeatureServer/0/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry={geometry}&geometryType=esriGeometryEnvelope&inSR=3301&outFields=*&outSR=3301&resultType=tile";

		String geometry = "{\"xmin\":" +
				//"545585.726849626" +
				xMin +
				",\"ymin\":" +
				//"6585329.13074252" +
				yMin +
				",\"xmax\":" +
				//"545887.8239857788" +
				xMax +
				",\"ymax\":" +
				//"6585631.227878673" +
				yMax +
				",\"spatialReference\":{\"wkid\":3301}}";
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response =
				restTemplate.getForEntity(urlString, String.class, geometry);
		convert(response.getBody());
	}


	public static void convert(String jsonString){
		if(!jsonString.contains("geometry\"")) {
			return;
		}
		jsonString = jsonString.replaceAll("},\"geometry\":\\{", ",");
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
			String csv = CDL.toString(docs2);
			if(Files.exists(Paths.get("/Users/marko/Documents/Garage48/DataScraper/tmp.csv"))){
				csv.replace("OBJECTID,kulu,kellaaeg,kahju_liik,x,y,kuupaev,juhtum,situats_ni", "");
				Files.write(Paths.get("/Users/marko/Documents/Garage48/DataScraper/tmp.csv"), csv.getBytes(), StandardOpenOption.APPEND);
			} else {
				Files.write(Paths.get("/Users/marko/Documents/Garage48/DataScraper/tmp.csv"), csv.getBytes(), StandardOpenOption.CREATE);
			}
		} catch (JSONException e) {
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}



}
