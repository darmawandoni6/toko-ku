import KategoriModel from "@modules/kategori/model";

const seddDb = async () => {
  try {
    await KategoriModel.create({ nama: "other" });
  } catch (error) {
    const e = error as Error;
    console.log(e.message);
  }
};

seddDb();
