class AddClickWidthArrayToPaintings < ActiveRecord::Migration[5.0]
  def change
    add_column :paintings, :clickWidthArray, :string, array: true
  end
end
