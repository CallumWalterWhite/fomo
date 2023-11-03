using compass.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

[BsonIgnoreExtraElements]
public class Location : Entity
{
    [BsonElement("title")]
    public string Title { get; set; }

    [BsonElement("searchterm")]
    public string SearchTerm { get; set; }

    [BsonElement("link")]
    public string Link { get; set; }

    [BsonElement("main_category")]
    public string MainCategory { get; set; }

    [BsonElement("rating")]
    public double Rating { get; set; }

    [BsonElement("reviews")]
    public int Reviews { get; set; }

    [BsonElement("website")]
    public string Website { get; set; }

    [BsonElement("phone")]
    public string Phone { get; set; }

    [BsonElement("address")]
    public string Address { get; set; }

    [BsonElement("place_id")]
    public string PlaceId { get; set; }

    [BsonElement("status")]
    public string Status { get; set; }

    [BsonElement("price_range")]
    public string PriceRange { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("reviews_per_rating")]
    public Dictionary<string, int> ReviewsPerRating { get; set; }

    [BsonElement("reviews_link")]
    public string ReviewsLink { get; set; }

    [BsonElement("thumbnail")]
    public string Thumbnail { get; set; }

    [BsonElement("images")]
    public List<ImageInfo> Images { get; set; }

    [BsonElement("hours")]
    public List<OpeningHours> Hours { get; set; }

    [BsonElement("menu")]
    public MenuInfo Menu { get; set; }

    [BsonElement("order_online_links")]
    public List<OrderOnlineLink> OrderOnlineLinks { get; set; }

    [BsonElement("reservations")]
    public List<ReservationLink> Reservations { get; set; }

    /*[BsonElement("owner")]
    public OwnerInfo? Owner { get; set; }*/

    [BsonElement("categories")]
    public List<string> Categories { get; set; }

    /*[BsonElement("coordinates")]
    public Coordinates Coordinates { get; set; }*/

    [BsonElement("plus_code")]
    public string PlusCode { get; set; }

    [BsonElement("complete_address")]
    public CompleteAddress CompleteAddress { get; set; }

    [BsonElement("time_zone")]
    public string TimeZone { get; set; }

    /*[BsonElement("about")]
    public List<AboutInfo> About { get; set; }*/

    /*[BsonElement("user_reviews")]
    public List<UserReview> UserReviews { get; set; }*/

    [BsonElement("cid")]
    public string Cid { get; set; }

    [BsonElement("data_id")]
    public string DataId { get; set; }

    [BsonElement("CityId")]
    public int CityId { get; set; }
}

public class ImageInfo
{
    [BsonElement("thumbnail")]
    public string Thumbnail { get; set; }

    [BsonElement("title")]
    public string Title { get; set; }
}

public class OpeningHours
{
    [BsonElement("day")]
    public string Day { get; set; }

    [BsonElement("times")]
    public List<string> Times { get; set; }
}

public class MenuInfo
{
    [BsonElement("link")]
    public string Link { get; set; }

    [BsonElement("source")]
    public string Source { get; set; }
}

public class OrderOnlineLink
{
    [BsonElement("link")]
    public string Link { get; set; }

    [BsonElement("source")]
    public string Source { get; set; }
}

public class ReservationLink
{
    [BsonElement("link")]
    public string Link { get; set; }

    [BsonElement("source")]
    public string Source { get; set; }
}

public class OwnerInfo
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("id")]
    public string? Id { get; set; }

    [BsonElement("link")]
    public string? Link { get; set; }

    [BsonElement("name")]
    public string? Name { get; set; }
}

public class Coordinates
{
    [BsonElement("latitude")]
    public decimal Latitude { get; set; }

    [BsonElement("longitude")]
    public decimal Longitude { get; set; }
}

public class CompleteAddress
{
    [BsonElement("borough")]
    public string Borough { get; set; }

    [BsonElement("city")]
    public string City { get; set; }

    [BsonElement("country_code")]
    public string CountryCode { get; set; }

    [BsonElement("postal_code")]
    public string PostalCode { get; set; }

    [BsonElement("state")]
    public string State { get; set; }

    [BsonElement("street")]
    public string Street { get; set; }
}

public class AboutInfo
{
    [BsonElement("id")]
    public string Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("options")]
    public List<AboutOption> Options { get; set; }
}

public class AboutOption
{
    [BsonElement("enabled")]
    public bool Enabled { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }
}

public class UserReview
{
    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("images")]
    public List<string> Images { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("profile_picture")]
    public string ProfilePicture { get; set; }

    [BsonElement("rating")]
    public float Rating { get; set; }

    [BsonElement("when")]
    public string When { get; set; }
}
