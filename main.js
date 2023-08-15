//console.log('script kontrol)

const container = document.querySelector(".container");
//console.log(container)

const select = document.querySelector("#movie");
//console.log(select.value)

const count = document.getElementById("count");
//console.log(count)

const amount = document.getElementById("amount");
//console.log(amount)

const infoText = document.querySelector(".infoText");
//console.log(infoText)

//Veritabanı işlemninde kullanmak için tüm koltukları alıyoruz
const seats = document.querySelectorAll(".seat:not(.reserved)");
//console.log(seats)


//Yapılan Aşamalar

//1-Koltuklara erişmek için container divini js e çektik
//2-Container divine bir event listener ekledik
//3-maouseEventi yakalyıp tıklanılan elamanın koltuk olup olmadığını tespit ettik
//4-tıklanılan koltuğa selected classını tekrar tıklandığında kalması için toggle ile verdik
//5-Fiyatı hesablamak için toplam koltuk sayısını bulduk
//6-FİLMİN FİYATI İÇİN SELECTİ ÇEKTİK VE VALUE ÖZELLİĞİ İLE İÇİNDEKİ FİLMİN FİYATINA ULAŞTIK
//7-Info textteki count ve amount spaını çektik
//8-count spanın içine toplam koltuk sayısını veridk
//9-amount spanın içerisine ise toplam tutar için kolatuk sayısı * fiyat bilgisi değerini verdik


//Veritabanı işlemlerine başlıyoruz

//10-Öncelikle seçilen koltukların verilerine ulaştık
//11-tüm koltukları içermesi iin seats değişkeni oluştruduk ve htmldeki tüm seat clasına sahip ancak reserve classına sahip olmayan divle çektik
//12-bizim öncesinden elde ettiğimizi tüm koltuk verileri ve seçilen koltuk verileri dizi formatın değildi
//13-bunu diziye dönüştürmek için seçilen koltuk dizi ve tüm koltuk dizi şeklinde iki tane boş dizi tanımladık
//14-seçilen koltuk verilnei ve tüm kolatuk verini foreach ile dönüp oluştrurp dizilere attık
//15-seçilen koltuğun indexini öğrenmek için allSelectedSeatsArray dizini döndük
//16-dönen her bir eleman benım seçtiğim koltuk
//17-döngüdeyken gelen her bir seatin indexini allSeatsArray de indexOf ile sorguladık
//18-döngü bitiminde de return ile sonucu dışa aktarıp veritabanı kaydında kullanacağımız selectedIndexs değişkenei atadık
//19-Veritabanı kayıt için bir fonksiyon olutşrduk
//20-localstroage kaydı için setItem metodunu kullandık
//21-localStorage.setItem('kayıtedilcekveri adı',json formatına dönüştürülmüş veri)
//22-seçilen filmi de selectin value üzerinden gelen indexi kaydederek sağladık
//23-kayıt ettiğimiz verileri okumak için getSeatsFromDatabase fonksiyonu oluştrduk
//24-localStorag dan veri çekmek için getItem metodunu kullanılır
//25-JSON.parse(localStorage.getItem('kayıtEttiğimizveriismi')) 
//26-tüm koları forEach ile dönüyoruz ki veri tabanından gelecek indexler ile tüm koltuklardaki indeleri sorgulayabileierim
//27-tümkoltuk dizi forEcah inden geelen index eğer veri tabanından gelen koltukDizinde bir ondexe denk geliyorsa
//28-foreach döndsünden gelen seat e selected clası veriyoruz





//Veritabanında bulunan verileri çekmek için kullancağımız fonksiyon

const getSeatsFromDatabase = () => {
  //seçilen film bilgisini veri tabının dan alıp
  //JSON.parse ile okuyabilceğimiz formata dönüştürdük
  //dönüştürüdüğümüz bu veriyi kullanmak değişkene atadık
  const dbSelectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
  //console.log(dbSelectedMovie)

  if (dbSelectedMovie) {
    select.selectedIndex = dbSelectedMovie;
  }

  //veritabanındaki koltukların index bilgilerine erişiyoruz
  const dbSelectSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  //console.log(dbSelectSeats)

  //Önce veritabanından index geliyormu bunu kontrol edecez
  //daha gelen koltuk indexlerini maplayip burda indexin -1 den büyük olmasını kontrol edecez

  if (dbSelectSeats !== null && dbSelectSeats.length > 0) {
    //Toplam info alanının görünür olmasını sağladık
    infoText.classList.add("open");
    //Tüm Koltukları teker teker döndük
    seats.forEach((seat, index) => {
      //bizim döngümüzden gelen index,
      //veritabanından gelen koltuk dizisnde indexOf dendiğinde -1den yukarı değerveryirosa
      //-1 dememizin sebebi index verisinin 0 olma durumuda var
      //bu koşul sağlanıorsa seat classlarına selected eklıyoruz
      if (dbSelectSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
};

// Veritabanına kayıt için kullnacağımız fonksiyon
function saveToDatabase(dataIndex) {
  localStorage.setItem("selectedSeats", JSON.stringify(dataIndex));
  localStorage.setItem("selectedMovie", JSON.stringify(select.selectedIndex));
}

getSeatsFromDatabase();




//toplam tutar ve veri tabanı için gerekli verilerin oluştrudğu fonksşyon
const calcTotal = () => {
  //Öncelikle seçili olan toplam koltuk sayısı
  //movie boxtaki movielerin fiyat bilgisi

  //Veritabanı kaydı için gerekli bilgilerin alınması




//**** VERİTABANI İŞLEMLERİ ****//


  //izlenecek yol
  //1-Bizim seçtiğimiz koltukların indexine ihtiyacımız var
  //2-bunun için tüm koltukları bir array şeklinde oluşturup
  //3-oluşturuduğumuz u tüm koltukar arrayın bizim selected olan koltuğun indexini sorgulamak

  //Seçilen Koltukların verilerini alıyoruz
  const selectedSeats = container.querySelectorAll(".seat.selected");
  //console.log(selectedSeats)

  //Tüm Koltukların tutulacağı Array

  const allSeatsArray = [];
  //Seçilen koltukların tutulacağı array

  const allSelectedSeatsArray = [];

  //Önce tüm koltukların dizisinini oluşturyoruz

  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  });

  //console.log(allSeatsArray)

  //Seçilen kolatıkları diziye dönüşütoruz
  selectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });

  //Seçili koltuğun indexini bulmak için
  //önce tüm seçili kolauklar dizisini map ile dönecem
  //sonra her bir dönen elamanın indexini tüm kolatukların olduğu liste indexOf ile sorgulacaz

  //seçilen tüm koltukların dizisi(allSelectedSeatsArray) maple dönülüyor.
  //Mapten dönen her bir koltuğun indexi
  //tüm koltukların tuutlduğu dizide(allSeatsArray) indexOf metodu ile sorgulanıyor
  //fonksiyonun sonucu return ile dışarı aktarılıp
  //Veritabanı kaydında kullanılmak üzere selectedIndexs değişkenine atanıyor
  let selectedIndexs = allSelectedSeatsArray.map((selectedSeat) => {
    return allSeatsArray.indexOf(selectedSeat);
  });
  //console.log(selectedIndexs)




//**** HESABLAMA İŞLEMLERİ ****//




  //Toplam seçili olan koltuk sayısını buluyoruz
  let selectedSeatsCount = container.querySelectorAll(".seat.selected").length;
  //console.log(selectedSeatsCount)

  //seçili koltuk varsa
  if (selectedSeatsCount > 0) {
    //toplam bilgisi paragarfının görünür olmawı için open classı veriyioruz
    infoText.classList.add("open");
  } else {
    //seçimi geri aldığımızda tekrar gitmesi için bu classı kaldırıyoruz
    infoText.classList.remove("open");
  }

  //her bir movienin fiyat bilgisine selectin value özellği ile eriştik
  let price = select.value;
  //console.log(price)

  //count değerini dinamik hale getiriyoruz

  count.innerText = selectedSeatsCount;

  amount.innerText = selectedSeatsCount * price;

  saveToDatabase(selectedIndexs);
};

calcTotal();

container.addEventListener("click", (mouseEvent) => {
  //Containerımızda tıklama yaptığımızda seat divimi tespit ettik
  //console.log(mouseEvent.target.offsetParent)
  //tespit edilen eleman hem seat classı içerecek hemde reserved classı içermeyecek
  if (
    mouseEvent.target.offsetParent.classList.contains("seat") &&
    !mouseEvent.target.offsetParent.classList.contains("reserved")
  ) {
    //tıklanın koltuk divini class larına selected ekliyoruz
    mouseEvent.target.offsetParent.classList.toggle("selected");

    calcTotal();
  }
});

select.addEventListener("change", () => {
  calcTotal();
});
