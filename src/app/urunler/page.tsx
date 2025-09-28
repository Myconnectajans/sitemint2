import HeroSlider from "@/components/HeroSlider";
import ProductCarousel, { ProductCard } from "@/components/ProductCarousel";

export const dynamic = "force-static";

export default function UrunlerPage() {
  const heroSlides = [
    {
      href: "https://www.bidolubaski.com/fuar-urunleri",
      image:
        "https://api.bidolubaski.com/sites/default/files/styles/original/public/banner/2025-09/anasayfa_banner_fuar_25.jpg?itok=6eRHALfm",
      mobileImage:
        "https://api.bidolubaski.com/sites/default/files/styles/original/public/banner/mobile/2025-09/anasayfa_banner_mobile_fuar_25.jpg?itok=wcq3aRdd",
      alt: "Fuar ürünleri",
    },
  ];

  const bestSellers: ProductCard[] = [
    {
      title: "Standart Kartvizit Kampanyası",
      href: "https://www.bidolubaski.com/kartvizit-kampanyasi",
      image: "https://api.bidolubaski.com/sites/default/files/styles/urun_card_246x165/public/product-image/2025-07/5tl_bos.png",
      quantity: "100 adet",
      oldPrice: "349,00 TL",
      price: "249,00 TL",
    },
    {
      title: "Davetiye",
      href: "https://www.bidolubaski.com/davetiye",
      image: "https://api.bidolubaski.com/sites/default/files/styles/urun_card_246x165/public/product-image/2019-03/kuse-davetiye-baski-bidolubaski_0.jpeg",
      quantity: "100 adet",
      oldPrice: "219,00 TL",
      price: "158,00 TL",
    },
    {
      title: "Standart Kartvizit",
      href: "https://www.bidolubaski.com/kartvizit/standart",
      image: "https://api.bidolubaski.com/sites/default/files/styles/urun_card_246x165/public/product-image/2020-09/standart-kartvizit-baski-bidolubaski.jpg",
      quantity: "100 adet",
      oldPrice: "499,00 TL",
      price: "422,00 TL",
    },
    {
      title: "Davetiye Zarfı",
      href: "https://www.bidolubaski.com/zarf/davetiye-zarfi",
      image: "https://api.bidolubaski.com/sites/default/files/styles/urun_card_246x165/public/product-image/2023-05/13x18cm.110gr_1.hamur_bidolubaski.jpg",
      quantity: "100 adet",
      oldPrice: "169,00 TL",
      price: "128,00 TL",
    },
  ];

  const cards: ProductCard[] = [
    {
      title: "Kuşe Sticker / Etiket",
      href: "https://www.bidolubaski.com/sticker-etiket-baski/kuse",
      image: "https://api.bidolubaski.com/sites/default/files/styles/urun_card_246x165/public/product-image/2018-10/sticker-etiket-baski-bidolubaski.jpg",
      quantity: "50 adet",
      oldPrice: "69,00 TL",
      price: "46,00 TL",
    },
    {
      title: "El İlanı",
      href: "https://www.bidolubaski.com/el-ilani",
      image: "https://api.bidolubaski.com/sites/default/files/styles/urun_card_246x165/public/product-image/2018-09/el-ilani-baski-bidolubaski.jpg",
      quantity: "100 adet",
      oldPrice: "179,00 TL",
      price: "119,00 TL",
    },
    {
      title: "Ekspres İki Kenar Oval Kartvizit",
      href: "https://www.bidolubaski.com/kartvizit/iki-kenar-oval-ekspres-baski",
      image: "https://api.bidolubaski.com/sites/default/files/styles/urun_card_246x165/public/product-image/2025-03/ikikenaroval_beyaz_1.png",
      quantity: "25 adet",
      oldPrice: "79,00 TL",
      price: "61,00 TL",
    },
    {
      title: "El İlanı - Bizi Deneyin",
      href: "https://www.bidolubaski.com/bizi-deneyin/el-ilani",
      image: "https://api.bidolubaski.com/sites/default/files/styles/urun_card_246x165/public/product-image/2024-04/el-ilani-bidolubaski.jpg",
      quantity: "100 adet",
      oldPrice: "69,00 TL",
      price: "49,00 TL",
    },
  ];

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-8">
      <HeroSlider slides={heroSlides} />
      <div className="mt-10 space-y-10">
        <ProductCarousel title="En Çok Satanlar" items={bestSellers} />
        <ProductCarousel title="Kartvizitler" items={cards} />
      </div>
    </main>
  );
}
