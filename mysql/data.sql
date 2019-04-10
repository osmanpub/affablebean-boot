
--
-- Sample data for table `category`
--

USE `affablebean`;

INSERT INTO `category` (`name`) VALUES ('dairy'),('meats'),('bakery'),('fruit & veg'),('cereals'),('drinks');


--
-- Sample data for table `product`
--
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('milk', 1.70, 'semi skimmed (1L)', 1);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('cheese', 2.39, 'mild cheddar (330g)', 1);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('butter', 1.09, 'unsalted (250g)', 1);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('free range eggs', 1.76, 'medium-sized (6 eggs)', 1);

INSERT INTO `product` (`name`, price, description, category_id) VALUES ('organic meat patties', 2.29, 'rolled in fresh herbs<br>2 patties (250g)', 2);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('parma ham', 3.49, 'matured, organic (70g)', 2);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('chicken leg', 2.59, 'free range (250g)', 2);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('sausages', 3.55, 'reduced fat, pork<br>3 sausages (350g)', 2);

INSERT INTO `product` (`name`, price, description, category_id) VALUES ('sunflower seed loaf', 1.89, '600g', 3);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('sesame seed bagel', 1.19, '4 bagels', 3);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('pumpkin seed bun', 1.15, '4 buns', 3);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('chocolate cookies', 2.39, 'contain peanuts<br>(3 cookies)', 3);

INSERT INTO `product` (`name`, price, description, category_id) VALUES ('corn on the cob', 1.59, '2 pieces', 4);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('red currants', 2.49, '150g', 4);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('broccoli', 1.29, '500g', 4);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('seedless watermelon', 1.49, '250g', 4);

INSERT INTO `product` (`name`, price, description, category_id) VALUES ('jumbo oats', 1.99, 'Jumbo Oats (500g)', 5);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('porridge oats', 2.75, 'Organic Porridge Oats (1kg)', 5);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('rice flakes', 2.99, 'Organic Rice Flakes (500g)', 5);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('granola', 3.99, 'Apple & Cinnamon Granola (400g)', 5);

INSERT INTO `product` (`name`, price, description, category_id) VALUES ('herbal tea', 2.50, 'Herbal Tea (20 bags)', 6);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('wholebean coffee', 10.75, 'Organic Fairtrade Wholebean Coffee (500g)', 6);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('green tea', 1.99, 'Organic Green Tea (15 bags)', 6);
INSERT INTO `product` (`name`, price, description, category_id) VALUES ('organic coffee', 4.75, 'Organic Fairtrade Italian Roast Ground Coffee (227g)', 6);


--
-- Sample data for table `msg_subject`
--
INSERT INTO `msg_subject` (`name`) VALUES ('Brands or product'),('Investor relations'),('Sustainability'),('The Company'),('Media enquiry'),('Website feedback'),('Other');


--
-- Sample data for table `msg_feedback`
--
INSERT INTO `msg_feedback` (`name`, email, msg, subject_id) VALUES ('joe bloggs', 'joe.bloggs@blogger.com', 'your website rocks!	', 6);
INSERT INTO `msg_feedback` (`name`, email, msg, subject_id) VALUES ('jane hippie', 'jane.peace@hippychick.com', 'what is the carbon footprint of your business? how green are you compared to other organic suppliers?					', 3);
INSERT INTO `msg_feedback` (`name`, email, msg, subject_id) VALUES ('gordon gekko', 'lunch.4.wimps@money-never-sleeps.com', 'i want to asset strip your business you punks! capitalism beats socialism if you rig the game for the rich!						', 2);


-- (without description)
--INSERT INTO `product` (`name`, price, category_id) VALUES ('milk', 1.70, 1);
--INSERT INTO `product` (`name`, price, category_id) VALUES ('cheese', 2.39, 1);
--INSERT INTO `product` (`name`, price, category_id) VALUES ('butter', 1.09, 1);
--INSERT INTO `product` (`name`, price, category_id) VALUES ('free range eggs', 1.76, 1);
--
--INSERT INTO `product` (`name`, price, category_id) VALUES ('organic meat patties', 2.29, 2);
--INSERT INTO `product` (`name`, price, category_id) VALUES ('parma ham', 3.49, 2);
--INSERT INTO `product` (`name`, price, category_id) VALUES ('chicken leg', 2.59, 2);
--INSERT INTO `product` (`name`, price, category_id) VALUES ('sausages', 3.55, 2);
--
--INSERT INTO `product` (`name`, price, category_id) VALUES ('sunflower seed loaf', 1.89, 3);
--INSERT INTO `product` (`name`, price, category_id) VALUES ('sesame seed bagel', 1.19, 3);
--INSERT INTO `product` (`name`, price, category_id) VALUES ('pumpkin seed bunbun', 1.15, 3);
--INSERT INTO `product` (`name`, price, category_id) VALUES ('chocolate cookies', 2.39, 3);
--
--INSERT INTO `product` (`name`, price, category_id) VALUES ('corn on the cob', 1.59, 4);
--INSERT INTO `product` (`name`, price, category_id) VALUES ('red currants', 2.49, 4);
--INSERT INTO `product` (`name`, price, category_id) VALUES ('broccoli', 1.29, 4);
--INSERT INTO `product` (`name`, price, category_id) VALUES ('seedless watermelon', 1.49, 4);

