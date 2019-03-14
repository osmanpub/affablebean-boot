/*
 * Copyright (c) 2010, Oracle and/or its affiliates. All rights reserved.
 *
 * You may not modify, use, reproduce, or distribute this software
 * except in compliance with the terms of the license at:
 * http://developer.sun.com/berkeley_license.html
 */
package com.affablebean.validate;

import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author tgiunipero
 */
public final class Validator {

	// ensures that quantity input is number between 0 and 99 applies to 
	// quantity fields in cart page
	public static boolean validateQuantity(String productId, String quantity) {
		boolean errorFlag = false;

		if (!productId.isEmpty() && !quantity.isEmpty()) {
			int i = -1;

			try {
				i = Integer.parseInt(quantity);
			} catch (NumberFormatException nfe) {
				System.out.println("User did not enter a number in the quantity field");
				errorFlag = true;
			}

			if (i < 0 || i > 99) {
				errorFlag = true;
			}
		}

		return !errorFlag;
	}

	// performs simple validation on checkout form
	public static boolean validateCheckOutForm(HttpServletRequest request,
					String... data) {

		boolean errorFlag = false;

		if (data[0] == null || data[0].isEmpty() || data[0].trim().length() < 8
						|| data[0].trim().length() > 45) {
			errorFlag = true;
			request.setAttribute("nameError", true);
		}

		if (data[1] == null || data[1].isEmpty() || !data[1].contains("@")
						|| data[1].trim().length() < 8 || data[1].trim().length() > 45) {
			errorFlag = true;
			request.setAttribute("emailError", true);
		}

		if (data[2] == null || data[2].isEmpty() || data[2].trim().length() < 8
						|| data[2].trim().length() > 30) {
			errorFlag = true;
			request.setAttribute("phoneError", true);
		}

		if (data[3] == null || data[3].isEmpty() || data[3].trim().length() < 8
						|| data[3].trim().length() > 45) {
			errorFlag = true;
			request.setAttribute("addressError", true);
		}

//		if (data[4] == null || data[4].isEmpty() || data[4].trim().length() > 2) {
//			errorFlag = true;
//			request.setAttribute("cityRegionError", true);
//		}
		if (data[5] == null || data[5].isEmpty() || data[5].trim().length() < 8
						|| data[5].trim().length() > 19) {
			errorFlag = true;
			request.setAttribute("ccNumberError", true);
		}

		return !errorFlag;
	}

	// performs simple validation on contact us form
	public static boolean validateContactForm(HttpServletRequest request,
					String... data) {

		boolean errorFlag = false;

		if (data[0] == null || data[0].isEmpty() || data[0].trim().length() < 5
						|| data[0].trim().length() > 45) {
			errorFlag = true;
			request.setAttribute("nameError", true);
		}

		if (data[1] == null || data[1].isEmpty() || !data[1].contains("@")
						|| data[1].trim().length() < 8 || data[1].trim().length() > 45) {
			errorFlag = true;
			request.setAttribute("emailError", true);
		}

		if (data[2] == null || data[2].isEmpty() || data[2].trim().length() < 10) {
			errorFlag = true;
			request.setAttribute("msgError", true);
		}

		return !errorFlag;
	}

	public Validator() {
	}
}
