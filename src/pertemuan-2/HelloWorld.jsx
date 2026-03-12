export default function HelloWorld() {
  const propsUserCard = {
    nama: "Goku",
    nim: "999999",
    tanggal: "2025-01-01",
  };
  return (
    <div>
      <h1>Hello World</h1>
      <p>Selamat belajar ReactJS</p>
      <GreetingDuri />
      <QuoteText />
      <div className="img-card">
        <UserCard
          // CARA GANTENG
          {...propsUserCard}

          // CARA GA GANTENG
          // nama={propsUserCard.nama}
          // nim={propsUserCard.nim}
          // tanggal={propsUserCard.tanggal}

          // CARA BIASA
          // nama= "Arief"
          // nim="2455301093"
          // tanggal={new Date().toLocaleDateString()}
        />

        <img src="img/wondie.jpg" alt="wondie cantiks" />
      </div>
    </div>
  );
}

function GreetingDuri() {
  return (
    <div>
      <small>Salam dari Duri</small>
      <p>ijin</p>
    </div>
  );
}

function QuoteText() {
  const text = "Mulutmu Harimaumu";
  const text2 = "Aku ingin jadi macan";
  return (
    <div>
      <hr />
      <p>{text.toLowerCase()}</p>
      <p>{text2.toUpperCase()}</p>
    </div>
  );
}

function UserCard(props) {
  return (
    <div>
      <hr />
      <h3>Nama: {props.nama}</h3>
      <h3>NIM: {props.nim}</h3>
      <h3>Tanggal: {props.tanggal}</h3>
    </div>
  );
}
