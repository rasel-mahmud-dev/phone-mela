Mobile Shop Ecommerce website, build with Golang and React js



### API Endpoint
```go
    router.HandleFunc("/api/brands", controllers.FetchBrands).Methods("GET")
	router.HandleFunc("/api/products", controllers.FetchProducts).Methods("GET")
	router.HandleFunc("/api/product/{id}", controllers.FetchProduct).Methods("GET")
	router.HandleFunc("/api/sign-in", controllers.Login).Methods("POST")
	router.HandleFunc("/api/sign-current-user", middleware.IsAuth(controllers.LoginCurrentUser)).Methods("GET")
	router.HandleFunc("/api/filter-products", controllers.FilterProduct).Methods("POST")
	router.HandleFunc("/api/product", middleware.IsAuth(controllers.AddProduct)).Methods("POST")
	
```

## This Application under development

[Live Link]("https://phone-mela.vercel.app")
### Preview screenshot

![preview-image](2022-03-19_020533.png)


[{"label":"Network","props":{"Speed":"HSPA 42.2/5.76 Mbps, LTE ","2G bands":"GSM 850 / 900 / 1800 / 1900 - SIM 1 & SIM 2","3G bands":"HSDPA 850 / 900 / 2100","4G bands":"LTE band 1(2100), 2(1900), 3(1800), 4(1700/2100), 5(850), 7(2600), 8(900), 11(1500), 12(700), 13(700), 17(700), 18(800), 19(800), 20(800), 21(1500), 25(1900), 26(850), 28(700), 29(700), 30(2300), 32(1500), 34(2000), 38(2600), 39(1900), 40(2300), 41(2500), 42(3500), 46, 48, 66(1700/2100) - A2215 LTE band 1(2100), 2(1900), 3(1800), 4(1700/2100), 5(850), 7(2600), 8(900), 12(700), 13(700), 14(700), 17(700), 18(800), 19(800), 20(800), 25(1900), 26(850), 29(700), 30(2300), 34(2000), 38(2600), 39(1900), 40(2300), 41(2500), 42(3500), 46, 48, 66(1700/2100), 71(600) - A2160 LTE band 1(2100), 2(1900), 3(1800), 4(1700/2100), 5(850), 7(2600), 8(900), 12(700), 13(700), 14(700), 17(700), 18(800), 19(800), 20(800), 25(1900), 26(850), 29(700), 30(2300), 34(2000), 38(2600), 39(1900), 40(2300), 41(2500), 42(3500), 46, 48, 66(1700/2100), 71(600) - A2217","5G bands":"5, 8, 38, 40, 41","Technology":"GSM / HSPA / LTE"}},{"label":"LAUNCH","props":{"Status":"Available. Released 2021","Announced":"2021, August 20"}},{"label":"DISPLAY","props":{"Type":"Super Retina XDR OLED capacitive touchscreen","Display Colors":"16M Colors","Size":"6.51 inches, 102.3 cm2 (~81.8% screen-to-body ratio)","Resolution":"720 x 1600 pixels, 20:9 ratio","Pixel Density":"458 ppi (pixels per inch)","Touch Screen":"Yes","Display Protection":"Scratch-resistant glass, oleophobic coatin","Features":"800 nits\nDolby Vision\nHDR10\nWide color gamut\nTrue-tone\n120 Hz touch-sensing"}},{"label":"Hardware","props":{"CPU":"Apple A13 Bionic","RAM (Memory)":"Apple A13 Bionic","Internal Storage":"Apple A13 Bionic","Memory Card Slot":"Apple A13 Bionic","Sensors":"Apple A13 Bionic"}},{"label":"Software","props":{"Operating System":"iOS 13","User Interface":"YES"}},{"label":"Camera","props":{"Rear Camera":"108 MP (wide) + 12 MP (telephoto) + 12 MP (ultrawide)","Image":"4k","Video":"2160p@24/30/60fps, 1080p@30/60/120/240fps, HDR, stereo sound rec.","Flash":"Quad-LED dual-tone flash, HDR (photo/panorama)","Front Camera":"12 MP + TOF 3D camera"}},{"label":"Connectivity","props":{"SIM":"Nano SIM","Dual SIM":"Single SIM (Nano-SIM and/or Electronic SIM card) or Dual SIM (Nano-SIM, dual stand-by) - for China","Wi-fi":"Wi-Fi 802.11 a/b/g/n/ac/ax, dual-band, hotspot","USB":"2.0, proprietary reversible connector Type C","GPS":"Yes, with A-GPS, GLONASS, GALILEO, QZSS","NFC":"Depends on Country","Wireless Charging":"Yes","Headphone Jack":"Yes"}},{"label":"Battery","props":{"Capacity":"Li-Ion 5190 mAh battery + Fast battery charging 18W: 50% in 30 min + USB Power Delivery 2.0 + Qi wireless charging","Placement":"Non-removable"}}]