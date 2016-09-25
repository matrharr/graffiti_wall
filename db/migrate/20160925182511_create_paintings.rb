class CreatePaintings < ActiveRecord::Migration[5.0]
  def change
    create_table :paintings do |t|
      t.integer :clickXArray, array: true
      t.integer :clickYArray, array: true
      t.integer :clickDrayArray, array: true

      t.timestamps
    end
  end
end
