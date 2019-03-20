package com.affablebean.service;

import java.util.List;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;

import com.affablebean.domain.Promotion;
import com.affablebean.repository.PromotionRepository;

@Service
public class PromotionService {

	@Resource
	private PromotionRepository repository;

	public Promotion findSale() {
		List<Promotion> promotions = repository.findSale(true);

		// only the first found sale is used, rest ignored
		return promotions.isEmpty() ? null : promotions.get(0);
	}
}
