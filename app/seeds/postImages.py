from app.models import db, PostImage

def seed_images():
    img1 = PostImage(
        post_id = 1,
        image_url = 'https://images.pexels.com/photos/5990487/pexels-photo-5990487.jpeg'
        )

    img2 = PostImage(
        post_id = 2,
        image_url = 'https://images.pexels.com/photos/2228561/pexels-photo-2228561.jpeg'
        )

    img3 = PostImage(
        post_id = 3,
        image_url = 'https://images.pexels.com/photos/3932826/pexels-photo-3932826.jpeg'
        )

    img4= PostImage(
        post_id = 4,
        image_url = 'https://images.pexels.com/photos/4546169/pexels-photo-4546169.jpeg'
        )

    img5 = PostImage(
        post_id = 5,
        image_url = 'https://images.pexels.com/photos/4597120/pexels-photo-4597120.jpeg'
        )

    img6 = PostImage(
        post_id = 6,
        image_url = 'https://images.pexels.com/photos/1208783/pexels-photo-1208783.jpeg'
        )

    img7 = PostImage(
        post_id = 7,
        image_url = 'https://images.pexels.com/photos/1729927/pexels-photo-1729927.jpeg'
        )

    img8 = PostImage(
        post_id = 8,
        image_url = 'https://images.pexels.com/photos/8910455/pexels-photo-8910455.jpeg'
        )

    db.session.add(img1)
    db.session.add(img2)
    db.session.add(img3)
    db.session.add(img4)
    db.session.add(img5)
    db.session.add(img6)
    db.session.add(img7)
    db.session.add(img8)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE postImages RESTART IDENTITY CASCADE;')
    db.session.commit()
