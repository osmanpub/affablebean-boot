package com.affablebean.service;

import java.util.List;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;

import com.affablebean.model.Promotion;
import com.affablebean.repository.PromotionRepository;

@Service
public class PromotionService {

	@Resource
	PromotionRepository repository;

	Promotion findSale() {
		List<Promotion> promotions = repository.findSale(true);

		// only the first found sale is used, rest ignored
		return promotions.isEmpty() ? null : promotions.get(0);
	}
}
