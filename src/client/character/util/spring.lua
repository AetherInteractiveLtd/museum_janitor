local spring = {};

function spring.new(position, velocity, target)
    local self = setmetatable({}, {__index = spring});

    self.position = position;
    self.velocity = velocity;
    self.target = target;
    self.k = 0.1;
    self.friction = 0.9;

    return self;
end

-- write a spring update

function spring:update(dt)
    local d = (self.target - self.position);
    local f = d * self.k;

    self.velocity = (self.velocity * (1 - self.friction)) + f;
    self.position = self.position + self.velocity;

    return self.position;
end

return spring;