const formatMoney = (price : number) => {
  return new Intl.NumberFormat("id-ID", {
    style : "currency",
    currency : "IDR"
  }).format(price).replace(",00", "")
}

export const Rupiah = (price: number | undefined): string => {
  try {
    if (!price) {
      throw new Error('price cannot null')
    }
    return formatMoney(price)
  } catch (e) {
    if (e instanceof Error) {
      return e.message
    }
    return "kosong";
  }
}
