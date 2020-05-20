package test;

public class Test {

	public static void main(String[] args) {
		
		for(int i=0; i<24; i++){
			double b = 100.0/24 * (i + 1);
			System.out.println(".push-" + (i+1) + " { margin-left: " + b + "%;" + " margin-right: -" + "" + b +"%" + "" + ";}");
		}
	}
}
