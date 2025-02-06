"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../store/store"
import { updatePolygon, deletePolygon } from "../store/polygonSlice"

const PolygonList = () => {
  const polygons = useSelector((state: RootState) => state.polygons.polygons)
  const dispatch = useDispatch()

  const handleColorChange = (id: string, type: "fillColor" | "borderColor", color: string) => {
    const polygon = polygons.find((p) => p.id === id)
    if (polygon) {
      dispatch(updatePolygon({ ...polygon, [type]: color }))
    }
  }

  const handleLabelChange = (id: string, label: string) => {
    const polygon = polygons.find((p) => p.id === id)
    if (polygon) {
      dispatch(updatePolygon({ ...polygon, label }))
    }
  }

  const handleDelete = (id: string) => {
    dispatch(deletePolygon(id))
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Polygons</h2>
      {polygons.map((polygon) => (
        <div key={polygon.id} className="mb-4 p-4 border rounded">
          <input
            type="text"
            value={polygon.label}
            onChange={(e) => handleLabelChange(polygon.id, e.target.value)}
            className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex items-center mb-2">
            <label className="mr-2">Fill Color:</label>
            <input
              type="color"
              value={polygon.fillColor}
              onChange={(e) => handleColorChange(polygon.id, "fillColor", e.target.value)}
              className="w-8 h-8"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="mr-2">Border Color:</label>
            <input
              type="color"
              value={polygon.borderColor}
              onChange={(e) => handleColorChange(polygon.id, "borderColor", e.target.value)}
              className="w-8 h-8"
            />
          </div>
          <button
            onClick={() => handleDelete(polygon.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default PolygonList

