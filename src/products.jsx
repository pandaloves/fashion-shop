const products = [
  {
    productId: 1,
    productName: "Joely short dress",
    productPrice: 299,
    productDescription:
      "100% polyester. Polyester och andra syntetmaterial tappar mikroplast vid tvätt, så vi rekommenderar en tvättpåse för att skydda alla tyger och plagg från att slitas eller sträckas ut i tvättmaskinen. Det kommer också att begränsa mikrofiberläckage i tvättprocessen, vilket innebär att mikroplaster förhindras från att tränga in i floder och hav.",
    productImage:
      "https://image-resizing.booztcdn.com/ida-sjostedt/istjoelydress_cros_10.webp?has_grey=0&has_webp=0&dpr=2.5&size=w400",
  },
  {
    productId: 2,
    productName: "Sienna hot pink dress",
    productPrice: 499,
    productDescription:
      "Skivad tyll formar den här uttalande klänningen som har en lätt rynkad livdel med en söt halsringning (med halkfria remsor), inramad av axelband. Den passande midjan toppar en snurrvärd skaterkjol som slutar i en flirtig minifåll. Dold dragkedja/lås baktill.",
    productImage:
      "https://www.collagerie.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0567%2F2960%2F0181%2Fproducts%2FBeulah_Sienna_HotPink_Dress_Front_827ed20a-518c-4d49-bed6-2d2786d6bcd2.jpg%3Fv%3D1680796179&w=3840&q=75",
  },
  {
    productId: 3,
    productName: "Wide-Leg Dense Silk Trousers",
    productPrice: 399,
    productDescription:
      "Ett lätt tyg tillverkat av premium mullbärssilkefibrer, där en del av dem är vridna medurs och andra i moturs riktning. Dessa fibrer vävs sedan till ett slättvävt tyg.",
    productImage:
      "https://www.lilysilk.se/media/catalog/product/m2_custom/9890/41/1.jpg?quality=80&bg-color=255%2C255%2C255&fit=bounds&width=1800",
  },
  {
    productId: 4,
    productName: "Green Textured Long Coat",
    productPrice: 599,
    productDescription:
      "Oversized dubbelknäppt skräddarsydd kappa med breda, vassa vadderade axlar. Tillverkad av en borstad ullblandning som är gjord av återvunnet tyg.",
    productImage:
      "https://thehouseofrare.com/cdn/shop/files/DUNE-GREEN-CC-01672HERO.jpg?v=1692181253",
  },
  {
    productId: 5,
    productName: "Cottinfab dress",
    productPrice: 399,
    productDescription:
      "Gröna och blåa etniska motiv tryckt a-line klänning Fyrkantig hals Trekvarts, puffärm Samlad eller veckad detalj Maxi längd i volangfåll.",
    productImage:
      "https://cottinfab.com/cdn/shop/products/DSS9849B_1.jpg?v=1658397269",
  },
  {
    productId: 6,
    productName: "Cottinfab blue long dress",
    productPrice: 599,
    productDescription:
      "Var ditt modiga jag med denna eleganta blå a-linje klänning från huset av Cottinfab. Tillverkad i förstklassig viskos för superb glans och drapering, den är vacker.",
    productImage:
      "https://img.tatacliq.com/images/i7/437Wx649H/MP000000011546729_437Wx649H_202112231153021.jpeg",
  },
  {
    productId: 7,
    productName: "Trench Coats for Women",
    productPrice: 499,
    productDescription:
      "En trenchcoat är en viktig resesällskap och erbjuder en blandning av stil, funktionalitet och anpassningsförmåga. Det är en pålitlig sköld mot växlande väder som håller dig torr och bekväm samtidigt som den ger extra värme i kallare klimat.",
    productImage:
      "https://m.media-amazon.com/images/I/51J7wbYdUFL._AC_UY1000_.jpg",
  },
  {
    productId: 8,
    productName: "Pink Solid Dress",
    productPrice: 299,
    productDescription:
      "Letar du efter en fantastisk samling klänningar? ja, lägg händerna på den här klänningen från trend arrest och få även möjligheten att välja mellan lavendelfärg.",
    productImage:
      "https://www.berrylush.com/cdn/shop/products/BeFunky-design_20_01f99db8-d17c-4f5d-b92b-51a5d1b0fc0b.jpg?v=1628422958",
  },
  {
    productId: 9,
    productName: "Oversize wool coat",
    productPrice: 899,
    productDescription:
      "Ullmix tyg. Midi design. Oversize design. Lapel-krage V-ringad krage. Långärmad. Två sidfickor. Knäppning framtill. Slits baktill. Innerfoder. Office utseende.",
    productImage:
      "https://st.mngbcn.com/rcs/pics/static/T6/fotos/S20/67060448_99.jpg?ts=1699012974202&imwidth=360&imdensity=2",
  },
  {
    productId: 10,
    productName: "Women's Organic V-neck Tshirt",
    productPrice: 259,
    productDescription:
      "Att bygga en grönare, renare garderob börjar med t-shirts som den här. Vår Essential Women's V-neck T-shirt är uppfriskande annorlunda än engångs-T-shirts, och är gjord av rejäl och otroligt mjuk organisk peruansk Pima-bomull som kommer att hålla i år, ja år, av entusiastisk användning. Toppen med v-ringning är lätt rundad för en mjukare look och precis lagom djup.95 % ekologisk Pima bomull 5 % elastan stretchjersey.",
    productImage:
      "https://www.fairindigo.com/cdn/shop/files/BG_OF_03974_Sage_SS24_1535_720x.jpg?v=1710026423",
  },
  {
    productId: 11,
    productName: "Straight Leg 4-Season Trousers",
    productPrice: 730,
    productDescription:
      "Ett par 4-säsongsbyxor i klassisk rakbensform med en färg som aldrig går ur stilen. De rena linjerna är gjorda för att smickra dina kurvor. Vår 4-säsongskollektion är den ultimata lösningen för mångsidig garderob året runt.",
    productImage:
      "https://lanebryant.scene7.com/is/image/lanebryantProdATG/401208_0000009187?$pdpMainImage$",
  },
  {
    productId: 12,
    productName: "Men's Aran Wool Sweater",
    productPrice: 589,
    productDescription:
      "Aran Sweater är en tidlös garderob som är nödvändig och en tröja för livet. Bärd i århundraden av fiskaren från Irland och populär av Vogue på 1950-talet, den här robusta tröjan är en sann mångsysslare.",
    productImage:
      "https://cdn11.bigcommerce.com/s-scgdirr/products/17595/images/92077/C1347_-_Moss_Green__69889.1676391063.560.850.jpg?c=2",
  },
  {
    productId: 13,
    productName: "Women Gold SolidCasual Sweater",
    productPrice: 359,
    productDescription:
      "Vi presenterar den lyxiga guldtröjan från Allen Solly, designad för kvinnor som värderar mode och komfort lika mycket. Den här huvtröjan är gjord av mysigt akrylmaterial och lovar en åtsittande passform för ultimat komfort.",
    productImage:
      "https://imagescdn.planetfashion.in/img/app/product/6/643576-6434989.jpg?auto=format&w=494.40000000000003",
  },
  {
    productId: 14,
    productName: "Winter Thick Warm Parka Men Jacket",
    productPrice: 2019,
    productDescription:
      "Håller dig torr och bekväm - Den här vinterjackan för män har en tuff vattentät finish, vilket säkerställer att du förblir skyddad och torr. Låt inte vädret dämpa ditt humör - den här vinterjackan för män är designad för att hålla dig bekväm och snygg oavsett vad Moder Natur kastar på dig.",
    productImage:
      "https://m.media-amazon.com/images/I/71MlHIksisL._AC_SX569_.jpg",
  },
  {
    productId: 15,
    productName: "Cotton Casual Shirt",
    productPrice: 299,
    productDescription:
      "Tillverkad av premium bomullstyg som är mjukt, bekvämt, andas, håller länge och slitstarkt även efter många tvättar.",
    productImage:
      "https://www.oxford.com.pk/cdn/shop/files/Blue_4.jpg?v=1688717022&width=1200",
  },
  {
    productId: 16,
    productName: "LADIES LONG SLEEVE SHIRT WHITE",
    productPrice: 299,
    productDescription:
      "Långärmad volangskjorta för damer i vitt har en vit volang på kragen, muddarna och framsidan av skjortan. Denna fantastiska damskjorta i 100 % bomull med volangkrage är en vackert skräddarsydd elegant skjorta som kan bäras ensam eller också ser fantastisk ut under våra jackor och tröjor.",
    productImage:
      "https://www.hhequestrian.com.au/wp-content/uploads/2017/05/white-frill-shirt-1024x1536.jpg",
  },

  {
    productId: 17,
    productName: "Women Fit Sports White TShirt",
    productPrice: 259,
    productDescription:
      "Utstråla elegansen med varje outfit när du rockar den här T-shirten. Tillverkad av tyger av högsta kvalitet, den andas utomordentligt och lämnar en härlig chic känsla till alla dina outfits!",
    productImage:
      "https://www.globalrepublic.in/cdn/shop/products/1_83e28aa9-a80c-41e6-aed6-f306ab41f5c4_1000x.jpg?v=1591353307",
  },
  {
    productId: 18,
    productName: "WOMEN'S JERSEY SHORT SLEEVE TShirt",
    productPrice: 199,
    productDescription:
      "En del av vår avslappnade kollektion, denna t-shirt i tröja för kvinnor har rund hals, korta ärmar och en modern, lösare passform för enkel stil. Den här t-shirten är gjord av vår supermjuka 100 % Airlume-bomull och känns fantastisk hela dagen.",
    productImage:
      "https://www.bellacanvas.com/bella/product/hires/64000024511_1.jpg",
  },
  {
    productId: 19,
    productName: "WHITE CROP TOP AND POLKA DOTS SKIRT SET",
    productPrice: 1199,
    productDescription:
      "Lyft din stil med vår White Crop Top och Polka Dots Skirt Set, en perfekt blandning av chic och lekfull. Denna trendiga ensemble kombinerar en skarp vit crop-top med en flirtig prickig kjol, vilket skapar en fräsch och levande look.",
    productImage:
      "https://www.lavanyathelabel.com/cdn/shop/products/lbl101ks376_4_1000x.jpg?v=1672237893",
  },
  {
    productId: 20,
    productName: "Midi satin skirt",
    productPrice: 599,
    productDescription:
      "Flödande tyg. Satin. Midi design. Rak design. Resårband. Kontorsutseende. Sammansättning: 96 % polyester, 4 % elastan. Innehåller minst 50 % återvunnet material. Designad i Barcelona.",
    productImage:
      "https://shop.mango.com/assets/rcs/pics/static/T6/fotos/S20/67047149_05_D7.jpg?ts=1712578361673&imwidth=312&imdensity=2",
  },
  {
    productId: 21,
    productName: "BLEKT TSHIRT MED TEXT",
    productPrice: 299,
    productDescription:
      "Vid Tshirt. Rund krage. Kortärmad. Kombinerade tryck i kontrast på fram- och baksidan. Blekt effekt.",
    productImage:
      "https://static.zara.net/assets/public/2b30/fed2/a2024c86b4da/db613f14747a/06224428433-a1/06224428433-a1.jpg?ts=1709114725351&w=824",
  },
];

export default products;
