package ee.mkaar.garage48;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.*;
import java.util.*;

@SpringBootApplication
public class SchoolDistanceAggregatorApplication {

	public static void main(String[] args) {

	    if(args.length < 2){
            System.out.println("Usage: java -jar DistanceCalculator.jar /path/to/src/csv /path/to/final/csv");
            System.exit(0);
        }

		List<String> lines = getAddressLines("/Users/marko/Documents/Garage48/Keskklinn_addresses.csv");
		List<String> schools = getAddressLines(args[0]);

		int size = lines.size()/10;

		List<String> subList1 = lines.subList(0, size);
		List<String> subList2 = lines.subList(size, 2 * size);
		List<String> subList3 = lines.subList(2*size, 3 * size);
		List<String> subList4 = lines.subList(3*size, 4 * size);
		List<String> subList5 = lines.subList(4*size, 5*size);
        List<String> subList6 = lines.subList(5*size, 6*size);
        List<String> subList7 = lines.subList(6*size, 7 * size);
        List<String> subList8 = lines.subList(7*size, 8 * size);
        List<String> subList9 = lines.subList(8*size, 9 * size);
        List<String> subList10 = lines.subList(9*size, lines.size());

		Thread t1 = new Thread(new Runnable() {
			public void run() {
				calculateSchoolDistances(subList1, schools, args[1]);
			}
		});
		t1.start();

		Thread t2 = new Thread(new Runnable() {
			public void run() {
                calculateSchoolDistances(subList2, schools, args[1]);
			}
		});
		t2.start();


		Thread t3 = new Thread(new Runnable() {
			public void run() {
                calculateSchoolDistances(subList3, schools, args[1]);
			}
		});
		t3.start();

		Thread t4 = new Thread(new Runnable() {
			public void run() {
                calculateSchoolDistances(subList4, schools, args[1]);
			}
		});
		t4.start();

		Thread t5 = new Thread(new Runnable() {
			public void run() {
                calculateSchoolDistances(subList5, schools, args[1]);
			}
		});
		t5.start();


        Thread t6 = new Thread(new Runnable() {
            public void run() {
                calculateSchoolDistances(subList6, schools, args[1]);
            }
        });
        t6.start();

        Thread t7 = new Thread(new Runnable() {
            public void run() {
                calculateSchoolDistances(subList7, schools, args[1]);
            }
        });
        t7.start();


        Thread t8 = new Thread(new Runnable() {
            public void run() {
                calculateSchoolDistances(subList8, schools, args[1]);
            }
        });
        t8.start();

        Thread t9 = new Thread(new Runnable() {
            public void run() {
                calculateSchoolDistances(subList9, schools, args[1]);
            }
        });
        t9.start();

        Thread t10 = new Thread(new Runnable() {
            public void run() {
                calculateSchoolDistances(subList10, schools, args[1]);
            }
        });
        t10.start();


	}

    private static void calculateSchoolDistances(List<String> lines, List<String> schools, String location) {
        List<String> result = new ArrayList<>();

        for(String line : lines){
            List<String> topSchools = new ArrayList<>();

            for(String school : schools){
                Map<String, String> distance =
                DistanceFinder.getDurationAndDistance(line.split(",")[8],line.split(",")[9], school.split(",")[5], school.split(",")[6]);
                double value = Double.valueOf(distance.get("duration")) + Double.valueOf(distance.get("distance"));
                if(topSchools.size() < 3){
                topSchools.add(value + "," + distance.get("duration") + "," + distance.get("distance") + "," + school);
                } else {
                topSchools.add(value + "," + distance.get("duration") + "," + distance.get("distance") + "," + school);
                Collections.sort(topSchools);
                topSchools = topSchools.subList(0, 3);
                }
                }

                result.add(line + topSchools.get(0).split(",")[6] + "," +
                topSchools.get(0).split(",")[2] + "," + topSchools.get(0).split(",")[8] +
                "," + topSchools.get(0).split(",")[9]);
        }

        write(result, location);
    }


	private static List<String> getAddressLines(String csvFile) {
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

	public static void write(List<String> jsonString, String location) {
		for(String csv : jsonString) {
            try {
                if (Files.exists(Paths.get(location))) {
                    Files.write(Paths.get(location), csv.getBytes(), StandardOpenOption.APPEND);
                } else {
                    Files.write(Paths.get(location), csv.getBytes(), StandardOpenOption.CREATE);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
	}
}

