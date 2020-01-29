FactoryBot.define do
  
  factory :message do
    body     {"test"}
    image {File.open("#{Rails.root}/public/images/test_image.jpg")}
    group
    user
  end

end