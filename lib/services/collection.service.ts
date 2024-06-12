export const createNewCollection = async (dataForm: {
  title: string
  description: string
  image: string
}) => {
  const res = await fetch("/api/collections", {
    method: "POST",
    body: JSON.stringify(dataForm),
  })
  const data = await res.json()
  return data
}

export const updatedCollection = async (
  id: string,
  dataForm: { title: string; description: string; image: string },
) => {
  const res = await fetch(`/api/collections/${id}`, {
    method: "PUT",
    body: JSON.stringify(dataForm),
  })
  const data = await res.json()
  return data
}

export const getAllCollection = async () => {
  const res = await fetch("/api/collections")
  const data = await res.json()
  return data
}

export const deleteCollectionById = async (id: string) => {
  const data = await fetch(`/api/collections/${id}`, { method: "DELETE" })
  return data
}

export const getCollectionById = async (id: string) => {
  const res = await fetch(`/api/collections/${id}`, { method: "GET" })
  const data = await res.json()
  return data
}
